import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { EcardsService } from './ecards.service';
import { UpdateEcardDto } from './dto/update-ecard.dto';
import { CreateEcardBodyDto } from './dto/create-ecard-body.dto';
import { AuthToken } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';

@Controller('ecards')
export class EcardsController {
  constructor(
    private readonly ecardsService: EcardsService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(
    @Body() createEcardDto: CreateEcardBodyDto,
    @AuthToken() token: string | undefined,
  ) {
    console.log({ token });
    const options = createEcardDto.options;
    delete createEcardDto.options;

    const recipients = createEcardDto.recipients;
    delete createEcardDto.recipients;

    return this.ecardsService.create(
      createEcardDto,
      options,
      recipients,
      token,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll(@AuthToken() token: string | undefined) {
    if (!token) throw new UnauthorizedException();
    const user = await this.authService.getUserFromAccessToken(token);
    return this.ecardsService.findAllUsers(user?.id, user?.email);
  }

  @Get(':eCardNumber')
  findOne(@Param('eCardNumber') eCardNumber: string) {
    return this.ecardsService.findOne(eCardNumber);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEcardDto: UpdateEcardDto) {
    return this.ecardsService.update(id, updateEcardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ecardsService.remove(id);
  }
}
