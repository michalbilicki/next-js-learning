import { getSession } from 'next-auth/client';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const get = async (req, res) => {
  try {
    if (req.query.page && req.query.perPage) {
      const page = Number(req.query.page);
      const perPage = Number(req.query.perPage);
      const skip = page === 1 ? 0 : page * perPage - perPage;
      const items = await prisma.item.findMany({
        skip: skip,
        take: perPage
      });
      const totalCount = await prisma.item.count();

      return res.status(200).json({
        message: 'You can access this content because you are signed in.',
        totalCount: totalCount,
        pageCount: Number(
          Number.isInteger(totalCount / perPage)
            ? totalCount / perPage
            : Math.floor(totalCount / perPage) + 1
        ),
        currentPage: Number(page),
        perPage: Number(perPage),
        items: items
      });
    }
    const items = await prisma.item.findMany();
    return res.status(200).json({
      message: 'You can access this content because you are signed in.',
      items: items
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json();
  }
};

const post = async (req, res) => {
  try {
    const itemData = JSON.parse(req.body);
    const savedItem = await prisma.item.create({ data: itemData });
    console.log(savedItem);
    return res.status(200).json(savedItem);
  } catch (err) {
    return res.status(400).json();
  }
};

export const items = async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    switch (req.method) {
      case 'GET':
        get(req, res);
        break;
      case 'POST':
        post(req, res);
        break;
      default:
        return res.status(405).json({
          message: 'Method not allowed.'
        });
    }
  } else {
    return res.status(403).json({
      message: 'You must be sign in to view the protected content on this page.'
    });
  }
};

export default items;
