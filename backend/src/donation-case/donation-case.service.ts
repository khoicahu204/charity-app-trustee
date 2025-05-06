import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DonationCase } from './donation-case.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

import { DonationTransaction } from '../donation-transaction/donation-transaction.entity';


@Injectable()
export class DonationCaseService {
  constructor(
    @InjectRepository(DonationCase)
    private readonly caseRepo: Repository<DonationCase>,
    @InjectRepository(DonationTransaction)
    private readonly txRepo: Repository<DonationTransaction>,
  ) {}

  async createCase(
    data: { title: string; description: string; goalAmount: number },
    user: User
  ) {
    const newCase = this.caseRepo.create({
      ...data,
      createdBy: user,
    });
    return this.caseRepo.save(newCase);
  }


  async donateToCase(caseId: number, amount: number, user: User) {
    const donationCase = await this.caseRepo.findOneBy({ id: caseId });
    if (!donationCase) throw new Error('Không tìm thấy case');

    const transaction = this.txRepo.create({
      amount,
      donor: user,
      donationCase,
    });

    return this.txRepo.save(transaction);
  }

  async approveCase(id: number) {
    const target = await this.caseRepo.findOneBy({ id });
    if (!target) throw new Error('Không tìm thấy case');
    target.status = 'approved';
    return this.caseRepo.save(target);
  }


}