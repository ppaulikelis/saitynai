import { PrismaClient } from '@prisma/client';
import { bloodTestAnalyteDescriptions } from './data/bloodTestAnalyteDescriptions';
import { bloodTestAnalytes } from './data/bloodTestAnalytes';
import { bloodTests } from './data/bloodTests';
import { genders } from './data/genders';
import { medicalCards } from './data/medicalCards';
import { posts } from './data/posts';
import { users } from './data/users';

const prisma = new PrismaClient();

class Seed {
  main = async () => {
    try {
      //delete data
      await prisma.gender.deleteMany();
      await prisma.bloodTestAnalyteDescription.deleteMany();
      await prisma.user.deleteMany();
      await prisma.medicalCard.deleteMany();
      await prisma.post.deleteMany();
      await prisma.bloodTest.deleteMany();
      await prisma.bloodTestAnalyte.deleteMany();
      //add data
      await this.addGenders();
      await this.addBloodTestAnalyteDescriptions();
      await this.addUsers();
      await this.addMedicalCards();
      await this.addPosts();
      await this.addBloodTests();
      await this.addBloodTestAnalytes();
    } catch (error: any) {
      console.log(error);
    }
  };

  addGenders = async () => {
    for (let gender of genders) {
      await prisma.gender.create({
        data: gender,
      });
    }
  };

  addBloodTestAnalyteDescriptions = async () => {
    for (let bloodTestAnalyteDescription of bloodTestAnalyteDescriptions) {
      await prisma.bloodTestAnalyteDescription.create({
        data: bloodTestAnalyteDescription,
      });
    }
  };

  addUsers = async () => {
    for (let user of users) {
      await prisma.user.create({
        data: user,
      });
    }
  };

  addMedicalCards = async () => {
    for (let medicalCard of medicalCards) {
      await prisma.medicalCard.create({
        data: medicalCard,
      });
    }
  };

  addPosts = async () => {
    for (let post of posts) {
      await prisma.post.create({
        data: post,
      });
    }
  };

  addBloodTests = async () => {
    for (let bloodTest of bloodTests) {
      await prisma.bloodTest.create({
        data: bloodTest,
      });
    }
  };

  addBloodTestAnalytes = async () => {
    for (let bloodTestAnalyte of bloodTestAnalytes) {
      await prisma.bloodTestAnalyte.create({
        data: bloodTestAnalyte,
      });
    }
  };
}

const seed = new Seed();
const main = async () => {
  await seed.main();
};
main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
