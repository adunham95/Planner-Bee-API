import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

interface CloudflareDirectUploadResult {
  id: string;
  uploadURL: string;
  expiry: string;
}

interface CloudflareDirectUploadResponse {
  success: boolean;
  errors: any[];
  messages: string[];
  result: CloudflareDirectUploadResult;
}

@Injectable()
export class ImagesService {
  private readonly cloudflareAccountId =
    process.env.CLOUDFLARE_ACCOUNT_ID || '';
  private readonly cloudflareApiKey = process.env.CLOUDFLARE_API_TOKEN || ''; // or use API Token

  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async createImageUploadURL(): Promise<string> {
    const url = `http://api.cloudflare.com/client/v4/accounts/${this.cloudflareAccountId}/images/v2/direct_upload`;

    const form = new FormData();
    form.append('requireSignedURLs', 'true'); // note: string 'true'
    form.append(
      'metadata',
      JSON.stringify({ userId: '123', tag: 'profile-picture' }),
    );

    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${this.cloudflareApiKey}`,
    };

    try {
      console.log('Posting to:', url);
      console.log('API KEY', this.cloudflareApiKey);

      const response = await firstValueFrom(
        this.httpService.post<CloudflareDirectUploadResponse>(url, form, {
          headers,
        }),
      );

      console.log({ response });

      const data = response.data;

      console.log({ data });

      if (!data.success) {
        throw new InternalServerErrorException(
          'Cloudflare API returned an error.',
        );
      }

      return data.result.uploadURL;
    } catch (error: unknown) {
      console.log(error);
      const err = error as AxiosError;
      console.error(
        'Cloudflare direct upload error:',
        err?.response?.data || error,
      );
      throw new InternalServerErrorException(
        'Failed to get upload URL from Cloudflare',
      );
    }
  }
}
