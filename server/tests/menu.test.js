const request = require('supertest');
const app = require('../app'); // Załóżmy, że Twój plik z aplikacją to app.js
const Kebab = require('../models/kebab'); // Załóżmy, że Twój model to Kebab.js

jest.mock('../models/kebab');

describe('POST /menu', () => {
  it('should create a new menu item', async () => {
    Kebab.prototype.save.mockResolvedValueOnce({
      _id: 'mocked_id',
      product: 'Kebab',
      Opis: 'Pyszny kebab',
      Cena: 12,
      imageUrl: 'http://example.com/kebab.jpg'
    });

    const newItem = {
      product: 'Kebab',
      Opis: 'Pyszny kebab',
      Cena: 12,
      imageUrl: 'http://example.com/kebab.jpg'
    };

    const res = await request(app)
      .post('/menu')
      .send(newItem);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id', 'mocked_id');
    expect(res.body.product).toBe(newItem.product);
    expect(res.body.Opis).toBe(newItem.Opis);
    expect(res.body.Cena).toBe(newItem.Cena);
    expect(res.body.imageUrl).toBe(newItem.imageUrl);
  });

  it('should return 500 on internal server error', async () => {
    Kebab.prototype.save.mockRejectedValueOnce(new Error('Mock error'));

    const newItem = {
      product: 'Kebab',
      Opis: 'Pyszny kebab',
      Cena: 12,
      imageUrl: 'http://example.com/kebab.jpg'
    };

    const res = await request(app)
      .post('/menu')
      .send(newItem);

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('message', 'Internal server error');
  });
});

describe('DELETE /menu/:id', () => {
  it('should delete a menu item', async () => {
    const mockedItem = {
      _id: 'mocked_id',
      product: 'Kebab',
      Opis: 'Pyszny kebab',
      Cena: 12,
      imageUrl: 'http://example.com/kebab.jpg'
    };

    Kebab.findByIdAndDelete.mockResolvedValueOnce(mockedItem);

    const res = await request(app)
      .delete(`/menu/${mockedItem._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Produkt został pomyślnie usunięty.');

    expect(Kebab.findByIdAndDelete).toHaveBeenCalledWith(mockedItem._id);
  });

  it('should return 404 if menu item not found', async () => {
    Kebab.findByIdAndDelete.mockResolvedValueOnce(null); // Zwracamy null, gdy obiekt nie zostanie znaleziony

    const res = await request(app)
      .delete('/menu/non-existent-id');

    expect(res.statusCode).toBe(404); // Oczekujemy statusu 404, gdy obiekt nie zostanie znaleziony
    expect(res.text).toBe('Produkt nie został znaleziony.');

    expect(Kebab.findByIdAndDelete).toHaveBeenCalledWith('non-existent-id');
  });

  it('should return 500 on internal server error', async () => {
    const mockedError = new Error('Mock error');
    Kebab.findByIdAndDelete.mockRejectedValueOnce(mockedError);

    const res = await request(app)
      .delete('/menu/invalid-id');

    expect(res.statusCode).toBe(500);
    expect(res.text).toBe('Wystąpił błąd podczas usuwania produktu.');

    expect(Kebab.findByIdAndDelete).toHaveBeenCalledWith('invalid-id');
  });
});
