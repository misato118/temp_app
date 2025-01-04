import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOwnerApplicationInput } from './dto/create-ownerApplication.input';

@Injectable()
export class OwnerApplicationsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.ownerApplication.findMany();
  }
}