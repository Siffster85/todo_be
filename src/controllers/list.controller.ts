import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllLists  = async (req: Request, res: Response) => {
    try {
        const allLists = await prisma.list.findMany({
        include: { items: true },
        });
        res.status(200).json({ data: allLists });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getListById = async (req: Request, res: Response) => {
    try {
        const listId = req.params.id;
        const list = await prisma.list.findUnique({
        where: { id: listId },
        include: { items: true },
        });

        if (!list) {
        return res.status(404).json({ error: 'List not found' });
        }

        res.status(200).json({ data: list });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createList = async (req: Request, res: Response) => {
    try {
        const listData = req.body;
        const list = await prisma.list.create({ data: listData });
        res.status(201).json({ data: list });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to create list' });
    }
};

export const deleteList = async (req: Request, res: Response) => {
    try {
        const listId = req.params.id;
        const list = await prisma.list.delete({ where: { id: listId } });

        if (!list) {
        return res.status(404).json({ error: 'List not found' });
        }

        res.status(200).json({ data: {} });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};