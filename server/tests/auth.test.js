jest.mock('mongoose');

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // ścieżka do Twojego pliku aplikacji
const User = require('../models/user');

jest.mock('../models/user');

describe('Authentication Endpoints', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3002);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await new Promise((resolve) => server.close(resolve));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /register', () => {
    it('should register a new user', async () => {
      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue({
        _id: new mongoose.Types.ObjectId(),
        login: 'testuser',
        password: 'testpassword'
      });

      const res = await request(app)
        .post('/register')
        .send({
          login: 'testuser',
          password: 'testpassword'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.login).toBe('testuser');
    });

    it('should not register a user with an existing login', async () => {
      User.findOne.mockResolvedValue({
        _id: new mongoose.Types.ObjectId(),
        login: 'testuser',
        password: 'testpassword'
      });

      const res = await request(app)
        .post('/register')
        .send({
          login: 'testuser',
          password: 'anotherpassword'
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe("Nazwa użytkownika jest już zajęta");
    });
  });

  describe('POST /login', () => {
    it('should login an existing user', async () => {
      User.findOne.mockResolvedValue({
        _id: new mongoose.Types.ObjectId(),
        login: 'testuser',
        password: 'testpassword',
        roleId: 1
      });

      const res = await request(app)
        .post('/login')
        .send({
          login: 'testuser',
          password: 'testpassword'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should not login a non-existing user', async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post('/login')
        .send({
          login: 'nonexistent',
          password: 'testpassword'
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe("Nieprawidłowy login lub hasło.");
    });

    it('should not login with incorrect password', async () => {
      User.findOne.mockResolvedValue({
        _id: new mongoose.Types.ObjectId(),
        login: 'testuser',
        password: 'testpassword',
        roleId: 1
      });

      const res = await request(app)
        .post('/login')
        .send({
          login: 'testuser',
          password: 'wrongpassword'
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe("Nieprawidłowy login lub hasło");
    });
  });
});
