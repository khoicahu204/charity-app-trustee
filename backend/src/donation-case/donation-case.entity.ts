import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { User } from '../user/user.entity';
  
  @Entity()
  export class DonationCase {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column('text')
    description: string;
  
    @Column('int')
    goalAmount: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @ManyToOne(() => User, (user) => user.donationCases, { eager: true })
    createdBy: User;
  
    @Column({ default: 'pending' })
    status: 'pending' | 'approved' | 'rejected';
  }