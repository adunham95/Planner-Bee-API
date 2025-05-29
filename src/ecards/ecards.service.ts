import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEcardDto } from './dto/create-ecard.dto';
import { UpdateEcardDto } from './dto/update-ecard.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateOrderNumber } from 'src/utils/gnerateOrderNumber';
import { CreateOptionItemDto } from 'src/option-items/dto/create-option-item.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/auth.service';
import { CreateRecipientDto } from 'src/recipients/dto/create-recipient.dto';
import { MailService } from 'src/mail/mail.service';
import { CreateEcardBodyDto } from './dto/create-ecard-body.dto';

@Injectable()
export class EcardsService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
		private readonly mailService: MailService
	) {}

	async create(
		createEcardDto: CreateEcardBodyDto
		// accessToken?: string
	) {
		const options = createEcardDto.options;
		delete createEcardDto.options;

		const recipients = createEcardDto.recipients;
		delete createEcardDto.recipients;

		createEcardDto.eCardNumber = generateOrderNumber('ECARD');

		// if (accessToken && (!createEcardDto.senderEmail || !createEcardDto.senderID)) {
		// 	const payload: JwtPayload = this.jwtService.decode(accessToken);
		// 	console.log({ payload });
		// 	createEcardDto.senderID = payload.userId;
		// }

		// if (!createEcardDto.senderEmail || !createEcardDto.senderID) {
		// 	throw new BadRequestException('No Sender Entered');
		// }

		const eCard = await this.prisma.eCard.create({
			data: {
				deliveryDate: createEcardDto.deliveryDate,
				eCardTemplateSKU: createEcardDto.eCardTemplateSKU,
				status: createEcardDto.status,
				isCustom: createEcardDto.isCustom
			}
		});

		const optionItems =
			options?.map((opt) => {
				return {
					...opt,
					eCardId: eCard.id
				};
			}) || [];

		await this.prisma.eCardOptionItem.createMany({
			data: optionItems
		});

		const recipientItems =
			recipients?.map((opt) => {
				return {
					...opt,
					eCardID: eCard.id
				};
			}) || [];

		await this.prisma.recipient.createMany({ data: recipientItems });

		for (const rec of recipientItems) {
			if (rec?.email) {
				await this.mailService.sendECardNotification({
					to: rec.email,
					context: {
						firstName: rec.firstName,
						eCardNumber: eCard.eCardNumber || ''
					}
				});
			}
		}

		if (recipientItems.length > 0) {
			await this.prisma.eCard.update({
				where: { id: eCard.id },
				data: { status: 'sent' }
			});
		}

		return eCard;
	}

	findAll() {
		return this.prisma.eCard.findMany();
	}

	findAllUsers(userID?: number, userEmail?: string) {
		// return this.prisma.eCard.findMany({
		// 	where: {
		// 		OR: [
		// 			{
		// 				senderID: {
		// 					equals: userID
		// 				}
		// 			},
		// 			{ senderEmail: { equals: userEmail } }
		// 		]
		// 	},
		// 	include: { eCardTemplate: true }
		// });
		return [];
	}

	async findOne(eCardNumber: string) {
		return this.prisma.eCard.findFirst({
			where: { eCardNumber },
			include: {
				recipients: true,
				options: {
					include: {
						eCardComponent: {
							select: {
								ecardComponentID: true,
								order: true,
								label: true,
								editable: true
							}
						}
					}
				}
			}
		});
	}

	update(id: string, updateEcardDto: UpdateEcardDto) {
		console.log(updateEcardDto);
		return this.prisma.eCard.update({ where: { id }, data: updateEcardDto });
	}

	remove(id: string) {
		return `This action removes a #${id} ecard`;
	}
}
