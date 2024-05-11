import { Request, Response } from 'express';
import { IUser } from '../models/user';
import * as userService from '../services/userService';
import Joi, { Schema } from 'joi';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const createUserSchema: Schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required()
});

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData: IUser = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const updateUserSchema: Schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phoneNumber: Joi.string()
});
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const userData: Partial<IUser> = req.body;
        const updatedUser = await userService.updateUser(userId, userData);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        await userService.deleteUser(userId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
