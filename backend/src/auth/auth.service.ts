import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async register(data: { name: string; email: string; password: string }) {
    const existing = await this.userRepo.findOneBy({ email: data.email });
    if (existing) {
      throw new ConflictException('Email đã tồn tại');
    }

    const hashed = await bcrypt.hash(data.password, 10);
    const newUser = this.userRepo.create({ ...data, password: hashed });
    return this.userRepo.save(newUser);
  }
}