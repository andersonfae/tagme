import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Item } from './schemas/item.schema';
import { CreateItemDto, UpdateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  async create(dto: CreateItemDto): Promise<Item> {
    return this.itemModel.create(dto);
  }

  async findAll(query: any): Promise<any[]> {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const items = await this.itemModel
      .find(search ? { title: { $regex: search, $options: 'i' } } : {})
      .skip(skip)
      .limit(limit)
      .exec();

    // Renomear `_id` para `id`
    return items.map((item) => ({
      id: item._id,
      title: item.title,
      description: item.description,
      photoUrl: item.photoUrl,
    }));
  }

  async findOne(id: string): Promise<Item> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const item = await this.itemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  async update(id: string, dto: Partial<UpdateItemDto>): Promise<Item> {
    const item = await this.itemModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true }) // Usa $set para atualizações parciais
      .exec();

    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  async delete(id: string): Promise<void> {
    const validId = this.validateObjectId(id); // Valida o ID antes de usá-lo
    console.log('ID recebido para exclusão:', validId); // Log após validação
    const result = await this.itemModel.findByIdAndDelete(validId).exec();
    if (!result) throw new NotFoundException('Item not found');
  }

  // Método auxiliar para validar e converter IDs
  private validateObjectId(id: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    return new Types.ObjectId(id); // Converte o ID para ObjectId
  }
}
