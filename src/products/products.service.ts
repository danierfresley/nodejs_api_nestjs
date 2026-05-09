import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService {

  constructor(private prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    console.log(createProductDto);
    const product = await this.prismaService.product.create({
      data: createProductDto,
    });
    return product;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const totalPages = await this.prismaService.product.count({where: { available: true }});
    const lastPage = Math.ceil(totalPages / limit);
    return {
      data: await this.prismaService.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { available: true },
    }), metaData: {
      total: totalPages,
      page,
      lastPage,
    }};
  }

  async findOne(id: number) {
    const prodcut = await this.prismaService.product.findUnique({
      where: { id, available: true },
    });

    if (!prodcut) { 
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return prodcut;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    await this.findOne(id);

    return this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.product.update({
      where: { id },
      data: { available: false },
    });
  }
}
