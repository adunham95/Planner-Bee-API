import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const roundsOfHashing = 10;

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
  const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);
  // create two dummy users
  const user1 = await prisma.user.upsert({
    where: { email: 'sabin@adams.com' },
    update: {
      password: passwordSabin,
    },
    create: {
      email: 'sabin@adams.com',
      name: 'Sabin Adams',
      password: passwordSabin,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'alex@ruheni.com' },
    update: {
      password: passwordAlex,
    },
    create: {
      email: 'alex@ruheni.com',
      name: 'Alex Ruheni',
      password: passwordAlex,
    },
  });
  // create two dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {
      authorId: user1.id,
    },
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
      authorId: user1.id,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: {
      authorId: user2.id,
    },
    create: {
      title: "What's new in Prisma? (Q1/22)",
      body: 'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
      authorId: user2.id,
    },
  });

  const post3 = await prisma.article.upsert({
    where: { title: 'Prisma Client Just Became a Lot More Flexible' },
    update: {},
    create: {
      title: 'Prisma Client Just Became a Lot More Flexible',
      body: 'Prisma Client extensions provide a powerful new way to add functionality to Prisma in a type-safe manner...',
      description:
        'This article will explore various ways you can use Prisma Client extensions to add custom functionality to Prisma Client..',
      published: true,
    },
  });

  const eCardTemplateOne = await prisma.eCardTemplate.upsert({
    where: { sku: 'TACO' },
    update: {
      imageURL: '/images/pexels-betsai-ekmeiro-11923614-15434316.jpg',
    },
    create: {
      sku: 'TACO',
      name: 'Taco Tuesday',
      description: '',
      cost: 999,
      visible: false,
      imageURL: '/images/pexels-betsai-ekmeiro-11923614-15434316.jpg',
    },
  });

  await prisma.eCardComponent.upsert({
    where: { key: 'TACO-banner' },
    update: {},
    create: {
      key: 'TACO-banner',
      ecardID: eCardTemplateOne.id,
      ecardComponentID: 'banner',
      label: 'Banner',
      editable: false,
    },
  });

  await prisma.eCardComponent.upsert({
    where: { key: 'TACO-message' },
    update: {},
    create: {
      key: 'TACO-message',
      ecardID: eCardTemplateOne.id,
      ecardComponentID: 'message',
      label: 'Message',
      editable: true,
      default: "It's Taco Tuesday time to guac and roll!.",
    },
  });

  await prisma.eCardComponent.upsert({
    where: { key: 'TACO-headline' },
    update: {},
    create: {
      key: 'TACO-headline',
      ecardID: eCardTemplateOne.id,
      ecardComponentID: 'title',
      label: 'Headline',
      editable: true,
      default: '🌮 Its Taco Tuesday! 🌮',
    },
  });

  await prisma.eCardComponent.upsert({
    where: { key: 'TACO-color' },
    update: {},
    create: {
      key: 'TACO-color',
      ecardID: eCardTemplateOne.id,
      ecardComponentID: 'color-input',
      label: 'Color',
      editable: true,
      default: '#388E3C',
    },
  });

  const eCardTemplateBasicBirthday = await prisma.eCardTemplate.upsert({
    where: { sku: 'BDAY' },
    update: {
      imageURL: '/images/pexels-lilartsy-1793037.jpg',
    },
    create: {
      sku: 'BDAY',
      name: 'Happy Birthday',
      description: '',
      cost: 0,
      visible: true,
      imageURL: '/images/pexels-lilartsy-1793037.jpg',
    },
  });

  const eCardTemplateBasicAnniversary = await prisma.eCardTemplate.upsert({
    where: { sku: 'ADAY' },
    update: {
      imageURL: '/images/pexels-jonathanborba-2950331.jpg',
    },
    create: {
      sku: 'ADAY',
      name: 'Happy Anniversary',
      description: '',
      cost: 0,
      visible: true,
      imageURL: '/images/pexels-jonathanborba-2950331.jpg',
      components: {
        createMany: {
          data: [
            {
              key: 'ADAY-banner',
              ecardComponentID: 'banner',
              label: 'Banner',
              editable: false,
            },
            {
              key: 'ADAY-headline',
              ecardComponentID: 'title',
              label: 'Headline',
              editable: true,
              default: 'Happy Anniversary! 🎉',
            },
            {
              key: 'ADAY-message',
              ecardComponentID: 'message',
              label: 'Happy Anniversary Message',
              editable: true,
              default:
                "Wishing you a day filled with love, laughter, and everything that makes you happy. Here's to another year of wonderful memories and exciting adventures. Enjoy your special day!",
            },
            {
              key: 'ADAY-color',
              ecardComponentID: 'color-input',
              label: 'Color',
              editable: true,
              default: '#388E3C',
            },
          ],
        },
      },
    },
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
    },
  });

  await prisma.eCardComponent.upsert({
    where: { key: 'BDAY-message' },
    update: {},
    create: {
      key: 'BDAY-message',
      ecardID: eCardTemplateBasicBirthday.id,
      ecardComponentID: 'message',
      label: 'Happy Birthday Message',
      editable: true,
      default:
        "Wishing you a day filled with love, laughter, and everything that makes you happy. Here's to another year of wonderful memories and exciting adventures. Enjoy your special day!",
    },
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
    },
  });

  await prisma.eCardComponent.upsert({
    where: { key: 'BDAY-color' },
    update: {},
    create: {
      key: 'BDAY-color',
      ecardID: eCardTemplateOne.id,
      ecardComponentID: 'color-input',
      label: 'Color',
      editable: true,
      default: '#388E3C',
    },
  });

  await prisma.featuredItem.upsert({
    where: { ecardID: eCardTemplateBasicBirthday.id },
    update: {},
    create: {
      ecardID: eCardTemplateBasicBirthday.id,
    },
  });

  await prisma.category.upsert({
    where: { name: 'Birthday' },
    update: {},
    create: {
      name: 'Birthday',
      imageURL: '',
    },
  });

  await prisma.category.upsert({
    where: { name: 'Birthday' },
    update: {},
    create: {
      name: 'Birthday',
      imageURL: '',
      eCardTemplates: { connect: { id: eCardTemplateBasicBirthday.id } },
    },
  });

  await prisma.category.upsert({
    where: { name: 'Anniversary' },
    update: {},
    create: {
      name: 'Anniversary',
      imageURL: '',
    },
  });

  await prisma.category.upsert({
    where: { name: 'Thank You' },
    update: {},
    create: {
      name: 'Thank You',
      imageURL: '',
    },
  });

  const eCardTemplateGetWell = await prisma.eCardTemplate.upsert({
    where: { sku: 'GWSN' },
    update: {
      includedOptions: ['mealTrainEnabled'],
    },
    create: {
      sku: 'GWSN',
      name: 'Get Well Soon',
      description: '',
      cost: 0,
      visible: true,
      includedOptions: ['mealTrainEnabled'],
      components: {
        createMany: {
          data: [
            {
              key: 'GWSN-banner',
              ecardComponentID: 'banner',
              label: 'Banner',
              editable: false,
            },
            {
              key: 'GWSN-headline',
              ecardComponentID: 'title',
              label: 'Headline',
              editable: true,
              default: 'Get Well Soon 💐',
            },
            {
              key: 'GWSN-message',
              ecardComponentID: 'message',
              label: 'Message',
              editable: true,
              default:
                'Sending you healing thoughts and a little sunshine to brighten your day. Hope you feel better soon!',
            },
            {
              key: 'GWSN-color',
              ecardComponentID: 'color-input',
              label: 'Color',
              editable: true,
              default: '#039BE5',
            },
          ],
        },
      },
    },
  });

  const eCardTemplateThankYou = await prisma.eCardTemplate.upsert({
    where: { sku: 'THXU' },
    update: {},
    create: {
      sku: 'THXU',
      name: 'Thank You',
      description: '',
      cost: 0,
      visible: true,
      components: {
        createMany: {
          data: [
            {
              key: 'THXU-banner',
              ecardComponentID: 'banner',
              label: 'Banner',
              editable: false,
            },
            {
              key: 'THXU-headline',
              ecardComponentID: 'title',
              label: 'Headline',
              editable: true,
              default: 'Thank You! 🙏',
            },
            {
              key: 'THXU-message',
              ecardComponentID: 'message',
              label: 'Message',
              editable: true,
              default:
                'Thank you so much for your kindness and support. It truly means the world to me!',
            },
            {
              key: 'THXU-color',
              ecardComponentID: 'color-input',
              label: 'Color',
              editable: true,
              default: '#6A1B9A',
            },
          ],
        },
      },
    },
  });

  const eCardTemplateCongrats = await prisma.eCardTemplate.upsert({
    where: { sku: 'CNGR' },
    update: {},
    create: {
      sku: 'CNGR',
      name: 'Congratulations',
      description: '',
      cost: 0,
      visible: true,
      components: {
        createMany: {
          data: [
            {
              key: 'CNGR-banner',
              ecardComponentID: 'banner',
              label: 'Banner',
              editable: false,
            },
            {
              key: 'CNGR-headline',
              ecardComponentID: 'title',
              label: 'Headline',
              editable: true,
              default: 'Congratulations! 🎉',
            },
            {
              key: 'CNGR-message',
              ecardComponentID: 'message',
              label: 'Message',
              editable: true,
              default:
                'Huge congratulations on your achievement! Wishing you continued success and happiness.',
            },
            {
              key: 'CNGR-color',
              ecardComponentID: 'color-input',
              label: 'Color',
              editable: true,
              default: '#43A047',
            },
          ],
        },
      },
    },
  });

  const eCardTemplatePotluck = await prisma.eCardTemplate.upsert({
    where: { sku: 'PTLK' },
    update: {},
    create: {
      sku: 'PTLK',
      name: 'Potluck Invitation',
      description: '',
      cost: 0,
      visible: true,
      components: {
        createMany: {
          data: [
            {
              key: 'PTLK-banner',
              ecardComponentID: 'banner',
              label: 'Banner',
              editable: false,
            },
            {
              key: 'PTLK-headline',
              ecardComponentID: 'title',
              label: 'Headline',
              editable: true,
              default: "You're Invited! 🍽️",
            },
            {
              key: 'PTLK-message',
              ecardComponentID: 'message',
              label: 'Message',
              editable: true,
              default:
                'Join us for a delicious potluck! Bring your favorite dish and enjoy a great time with friends and family.',
            },
            {
              key: 'PTLK-color',
              ecardComponentID: 'color-input',
              label: 'Color',
              editable: true,
              default: '#8D6E63',
            },
          ],
        },
      },
    },
  });

  const eCardTemplateBirthdayInvite = await prisma.eCardTemplate.upsert({
    where: { sku: 'BDIN' },
    update: {},
    create: {
      sku: 'BDIN',
      name: 'Birthday Invitation',
      description: '',
      cost: 0,
      visible: true,
      components: {
        createMany: {
          data: [
            {
              key: 'BDIN-banner',
              ecardComponentID: 'banner',
              label: 'Banner',
              editable: false,
            },
            {
              key: 'BDIN-headline',
              ecardComponentID: 'title',
              label: 'Headline',
              editable: true,
              default: "You're Invited to a Birthday Bash! 🎉",
            },
            {
              key: 'BDIN-message',
              ecardComponentID: 'message',
              label: 'Invitation Message',
              editable: true,
              default:
                "Come celebrate with us! Join the party, enjoy some cake, and help make this birthday unforgettable. We can't wait to see you there!",
            },
            {
              key: 'BDIN-color',
              ecardComponentID: 'color-input',
              label: 'Color',
              editable: true,
              default: '#D81B60',
            },
          ],
        },
      },
    },
  });

  console.log({ user1, user2, post1, post2, post3 });
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
