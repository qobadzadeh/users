import {describe, expect,beforeAll, afterAll, it, jest} from '@jest/globals';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app';
import User from "../models/user";
import user from "../models/user";
import {response} from "express";


const userData = {
    name: 'Amir Qobadzadeh',
    email: 'qobadzadeh@gmail.com',
    phoneNumber: '1234567890',
};

beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://localhost:27017/testdb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    for (let i = 1 ; i < 3 ; i++){
        const newDoc = {
            name: 'Amir Qobadzadeh',
            email: 'qobadzadeh@gmail.com',
            phoneNumber: userData.phoneNumber + i,
        };
        await User.create(newDoc);
    }
});

afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.db.dropDatabase();
        await mongoose.disconnect();
    }
});

describe('User API Endpoints', () => {
    it('POST /users should create a new user', async () => {
        await request(app)
            .post('/users')
            .send(userData)
            .expect(201);
    });

    it('GET /users should return all users', async () => {
    const response = await request(app)
        .get('/users')
        .expect(200);
    });
});
