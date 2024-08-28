import { Injectable } from '@nestjs/common';
import { TransferRequestDto, TransferResponseDto } from 'src/transfer/dto/transfer.dto';
import { User } from 'src/user/entities/user.entity';
import { Account } from '../entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeEnum } from '../../user/enum/user-type.enum';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>)
    {}

  async transfer(transferDto: TransferRequestDto): Promise<TransferResponseDto> {
    const accountPayer = await this.accountRepository.findOne({ where: { id: transferDto.payer } }); 
    const accountPayee = await this.accountRepository.findOne({ where: { id: transferDto.payer } }); 


    const userHasBalance = await this.userHasBalance(accountPayer, transferDto.value);
    if (userHasBalance) {
      return {
        message: 'Transfer successful',
        value: transferDto.value,
        payer: transferDto.payer,
        payee: transferDto.payee,
        date: new Date(),        
      };
    } else {
      return {
        message: 'Insufficient balance',
        value: transferDto.value,
        payer: transferDto.payer,
        payee: transferDto.payee,
        date: new Date(), 
      };
    }
    return null;
  }

  async userHasBalance(accountPayer: Account, value: number): Promise<boolean> {
    let hasBalance = false;
    if (accountPayer.balance >= value) {
      hasBalance = true;
    }
    return hasBalance;
  }

  async transferValue(payerAccount: Account, payeeAccount: Account, value: number): Promise<void> {
    payerAccount.balance -= value;
    payeeAccount.balance += value;
    await this.accountRepository.save(payerAccount);
    await this.accountRepository.save(payeeAccount);
  }

  async hasPermissionForTransfer(payer: Account ): Promise<boolean> {
    const userId = payer.accountOwner;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    let hasPermission = false;
    const userType = user.userType;
    console.log(userType, 'user type'	);
    // if (userType === UserTypeEnum.CLIENT) {
    //   hasPermission = true;
    // }
    return hasPermission;
  }
}
