import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

const mockItem = {
  id: '60d21b4667d0d8992e610c85',
  title: 'Test Title',
  description: 'Test Description',
  photoUrl: 'test-photo.jpg',
};

const validObjectId = '60d21b4667d0d8992e610c85';

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        {
          provide: ItemsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockItem),
            findAll: jest.fn().mockResolvedValue([mockItem]),
            findOne: jest.fn().mockResolvedValue(mockItem),
            update: jest.fn().mockResolvedValue(mockItem),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);
  });

  it('should create a new item', async () => {
    const newItem = await controller.create(
      {
        title: 'New Item',
        description: 'New Description',
        photoUrl: 'test-photo.jpg',
      },
      { originalname: 'test-photo.jpg' } as any, // Mock de arquivo enviado
    );

    expect(newItem).toEqual(mockItem);
    expect(service.create).toHaveBeenCalledWith({
      title: 'New Item',
      description: 'New Description',
      photoUrl: 'test-photo.jpg',
    });
  });

  it('should find all items', async () => {
    const items = await controller.findAll({});
    expect(items).toEqual([mockItem]);
    expect(service.findAll).toHaveBeenCalledWith({});
  });

  it('should find an item by ID', async () => {
    const item = await controller.findOne(validObjectId);
    expect(item).toEqual(mockItem);
    expect(service.findOne).toHaveBeenCalledWith(validObjectId);
  });

  it('should update an item', async () => {
    const updatedItem = await controller.update(validObjectId, {
      title: 'Updated Title',
      description: 'Updated Description',
    });
    expect(updatedItem).toEqual(mockItem);
    expect(service.update).toHaveBeenCalledWith(validObjectId, {
      title: 'Updated Title',
      description: 'Updated Description',
    });
  });

  it('should delete an item', async () => {
    const result = await controller.remove(validObjectId);
    expect(result).toBeUndefined();
    expect(service.delete).toHaveBeenCalledWith(validObjectId);
  });
});
