import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto, UpdateItemDto } from './dto/create-item.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as sharp from 'sharp';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { Types } from 'mongoose';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = `${uuid()}-${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async create(
    @Body() createItemDto: CreateItemDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let photoUrl: string | undefined;

    if (file) {
      const resizedPath = `uploads/resized-${file.filename}`;
      photoUrl = `${process.env.HOST_URL || 'http://localhost:3000'}/${resizedPath}`; // URL completa da imagem

      // Redimensionando a imagem com sharp
      await sharp(file.path).resize(500, 500).toFile(resizedPath);
    }

    return this.itemsService.create({ ...createItemDto, photoUrl });
  }

  @Get()
  findAll(@Query() query: any) {
    return this.itemsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const validId = this.validateObjectId(id); // Valida o formato do ID
    return this.itemsService.findOne(validId); // Use a string validada
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = `${uuid()}-${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
    @UploadedFile() file?: Express.Multer.File, // Torna o arquivo opcional
  ) {
    const validId = this.validateObjectId(id);

    let photoUrl: string | undefined;

    if (file) {
      const resizedPath = `uploads/resized-${file.filename}`;
      photoUrl = `${process.env.HOST_URL || 'http://localhost:3000'}/${resizedPath}`;

      // Redimensionando a imagem com sharp
      await sharp(file.path).resize(500, 500).toFile(resizedPath);
    }

    const updatedData = { ...updateItemDto, ...(photoUrl && { photoUrl }) };

    return this.itemsService.update(validId, updatedData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const validId = this.validateObjectId(id); // Valida o formato do ID
    return this.itemsService.delete(validId); // Use a string validada
  }

  private validateObjectId(id: string): string {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    return id; // Retorna o ID como string
  }
}
