import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const roundsOfHashing = 10;

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
	const passwordAdmin = await bcrypt.hash('adminPassword', roundsOfHashing);

	const admin = await prisma.user.upsert({
		where: { email: 'admin@plannerbee.com' },
		update: {},
		create: {
			email: 'admin@plannerbee.com',
			firstName: 'Buzz',
			lastName: 'Honeywell',
			password: passwordAdmin
		}
	});

	const eCardTemplateBasicBirthday = await prisma.eCardTemplate.upsert({
		where: { sku: 'BDAY' },
		update: {},
		create: {
			sku: 'BDAY'
		}
	});

	await prisma.eCardComponent.upsert({
		where: { key: 'BDAY-banner' },
		update: {},
		create: {
			key: 'BDAY-banner',
			ecardID: eCardTemplateBasicBirthday.id,
			ecardComponentID: 'banner',
			label: 'Banner',
			editable: false,
			order: 1
		}
	});

	await prisma.eCardComponent.upsert({
		where: { key: 'BDAY-message' },
		update: {},
		create: {
			key: 'BDAY-message',
			order: 3,
			ecardID: eCardTemplateBasicBirthday.id,
			ecardComponentID: 'message',
			label: 'Happy Birthday Message',
			editable: true,
			default:
				"Wishing you a day filled with love, laughter, and everything that makes you happy. Here's to another year of wonderful memories and exciting adventures. Enjoy your special day!"
		}
	});

	await prisma.eCardComponent.upsert({
		where: { key: 'BDAY-headline' },
		update: {},
		create: {
			key: 'BDAY-headline',
			ecardID: eCardTemplateBasicBirthday.id,
			ecardComponentID: 'title',
			label: 'Headline',
			editable: true,
			default: 'Happy Birthday! 🎉',
			order: 2
		}
	});

	await prisma.eCardComponent.upsert({
		where: { key: 'BDAY-color' },
		update: {},
		create: {
			key: 'BDAY-color',
			ecardID: eCardTemplateBasicBirthday.id,
			ecardComponentID: 'color-input',
			label: 'Color',
			editable: true,
			default: '#388E3C',
			order: 1
		}
	});

	await prisma.category.upsert({
		where: { name: 'Birthday' },
		update: {},
		create: {
			name: 'Birthday',
			imageURL: ''
		}
	});

	await prisma.category.upsert({
		where: { name: 'Birthday' },
		update: {},
		create: {
			name: 'Birthday',
			imageURL: ''
		}
	});

	await prisma.product.upsert({
		where: { sku: 'BDAY' },
		update: {
			name: 'Happy Birthday ECard',
			eCardTemplateSKU: 'BDAY'
		},
		create: {
			sku: 'BDAY',
			name: 'Happy Birthday ECard',
			description: '',
			price: 0,
			visible: true,
			imageURL: '/images/pexels-lilartsy-1793037.jpg',
			eCardTemplateSKU: 'BDAY',
			productType: 'eCard'
		}
	});
}

// execute the main function
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
