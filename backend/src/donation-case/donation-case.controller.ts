import { Controller, Post, Body, UseGuards, Param, Patch } from '@nestjs/common';
import { DonationCaseService } from './donation-case.service';
import { AuthGuard } from '@nestjs/passport';
import { User as UserDecorator } from '../auth/user.decorator';
import { Role } from '../auth/role.decorator';
import { User } from '../user/user.entity';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('cases')
export class DonationCaseController {
  constructor(private readonly donationCaseService: DonationCaseService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)

  @Patch(':id/approve')
  @Role('admin')
  approveCase(@Param('id') id: number) 
  {
    return this.donationCaseService.approveCase(id);
  }


  @Post()
  createCase(
    @Body() body: { title: string; description: string; goalAmount: number },
    @UserDecorator() user: User
  ) {
    return this.donationCaseService.createCase(body, user);
  }


  @Post(':id/donate')
  donateToCase(
  @Param('id') caseId: number,
  @Body() body: { amount: number },
  @UserDecorator() user: User
  ) {
    return this.donationCaseService.donateToCase(caseId, body.amount, user);
  }


}