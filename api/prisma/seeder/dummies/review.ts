import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seed = async () => {
  const transaction = [];

  // Create a new review for Nice Guitar
  const createGuitarReview = prisma.review.create({
    data: {
      title: 'Good Guitar!',
      contents: 'The sound of the guitar was good.',
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
      itemId: 1,
    },
  });
  transaction.push(createGuitarReview);

  // Connect the review to an item
  const updateReviewGuitar = prisma.item.update({
    where: {
      id: 1,
    },
    data: {
      reviews: {
        connect: {
          id: 1,
        },
      },
    },
  });
  transaction.push(updateReviewGuitar);

  // Create another review for Nice Guitar
  const createGuitarReview2 = prisma.review.create({
    data: {
      title: 'Decent Guitar',
      contents: 'It was very decent quality.',
      rating: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      itemId: 1,
    },
  });
  transaction.push(createGuitarReview2);

  // Connect the review to an item
  const updateReview2Guitar = prisma.item.update({
    where: {
      id: 1,
    },
    data: {
      reviews: {
        connect: {
          id: 2,
        },
      },
    },
  });
  transaction.push(updateReview2Guitar);

  return await prisma.$transaction(transaction);
};
