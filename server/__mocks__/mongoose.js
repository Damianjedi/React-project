const mongoose = jest.requireActual('mongoose');

module.exports = {
    connect: jest.fn().mockResolvedValue({}),
    disconnect: jest.fn().mockResolvedValue({}),
    Types: {
      ObjectId: jest.fn().mockImplementation(() => 'mockedObjectId')
    },
    Schema: mongoose.Schema,
    model: mongoose.model,
  };