import User, { IUser } from '../models/user';

export const createUser = async (userData: IUser): Promise<void> => {
    try {
        await User.create(userData)
    } catch (error) {
        throw new Error(`Error creating user: ${(error as Error).message}`);
    }
};

export const updateUser = async (userId: string, userData: Partial<IUser>): Promise<IUser | null> => {
    try {
        return User.findByIdAndUpdate(userId, userData, { new: true });
    } catch (error) {
        throw new Error(`Error updating user: ${(error as Error).message}`);
    }
};

export const getUserById = async (userId: string): Promise<IUser | null> => {
    try {
        return User.findById(userId);
    } catch (error) {
        throw new Error(`Error fetching user: ${(error as Error).message}`);
    }
};

export const deleteUser = async (userId: string): Promise<void> => {
    try {
        await User.findByIdAndDelete(userId);
    } catch (error) {
        throw new Error(`Error deleting user: ${(error as Error).message}`);
    }
};

export const getAllUsers = async (): Promise<IUser[]> => {
    try {
        return await User.find();
    } catch (error) {
        throw new Error(`Error fetching users: ${(error as Error).message}`);
    }
};