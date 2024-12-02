import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllItems = async (req: Request, res: Response) => {
    try {
        const allItems = await prisma.item.findMany();
        res.status(200).json({ data: allItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getItemById = async (req: Request, res: Response) => {
    try {
        const itemId = req.params.id;
        const item = await prisma.item.findUnique({
        where: { id: itemId },
        });

        if (!item) {
        return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json({ data: item });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createItem = async (req: Request, res: Response) => {
    try {
        const itemData = req.body;
        const item = await prisma.item.create({ data: itemData });
        res.status(201).json({ data: item });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to create item' });
    }
};

export const updateItem = async (req: Request, res: Response) => {
    try {
        const itemId = req.params.id;
        const itemData = req.body;
        const item = await prisma.item.update({
        where: { id: itemId },
        data: itemData,
        });

        if (!item) {
        return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json({ data: item }); // Updated response to return the updated item
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to update item' }); // More specific error message
    }
};

export const deleteItem = async (req: Request, res: Response) => {
    try {
        const itemId = req.params.id;
        const item = await prisma.item.delete({
        where: { id: itemId },
        });

        if (!item) {
        return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json({ data: {} });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};