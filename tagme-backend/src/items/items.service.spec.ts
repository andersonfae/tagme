import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { getModelToken } from '@nestjs/mongoose';

const mockItem = {
  id: '60d21b4667d0d8992e610c85',
  title: 'Test Title',
  description: 'Test Description',
  photoUrl: 'test-photo.jpg',
};

const mockItemModel = {
  create: jest.fn().mockResolvedValue(mockItem),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockItem),
  }),
  findByIdAndUpdate: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockItem),
  }),
  findByIdAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockItem),
  }),
};

describe('ItemsService', () => {
  let service: ItemsService;
  let model: typeof mockItemModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getModelToken('Item'), // Token correto para o modelo Mongoose
          useValue: mockItemModel,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    model = module.get(getModelToken('Item'));
  });

  it('should create a new item', async () => {
    const newItem = await service.create({
      title: 'New Item',
      description: 'New Description',
      photoUrl: 'new-photo.jpg',
    });
    expect(newItem).toEqual(mockItem);
    expect(model.create).toHaveBeenCalledWith({
      title: 'New Item',
      description: 'New Description',
      photoUrl: 'new-photo.jpg',
    });
  });

  it('should find an item by ID', async () => {
    const foundItem = await service.findOne(mockItem.id);
    expect(foundItem).toEqual(mockItem);
    expect(model.findById).toHaveBeenCalledWith(mockItem.id);
  });

  it('should update an item', async () => {
    const updatedItem = await service.update(mockItem.id, {
      title: 'Updated Title',
      description: 'Updated Description',
    });

    expect(updatedItem).toEqual(mockItem);
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      mockItem.id,
      { $set: { title: 'Updated Title', description: 'Updated Description' } }, // Ajustado para incluir $set
      { new: true },
    );
  });

  it('should delete an item', async () => {
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(mockItem), // Simula um item existente
    });

    const result = await service.delete(mockItem.id); // Passe diretamente o ID como string
    expect(result).toBeUndefined();
    expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockItem.id);
  });
});
