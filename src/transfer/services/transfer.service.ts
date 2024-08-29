import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TransferRequestDto, TransferResponseDto } from '../../transfer/dto/transfer.dto';
import { User } from '../../user/entities/user.entity';
import { Account } from '../entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>)
    {}

  async transfer(transferDto: TransferRequestDto): Promise<TransferResponseDto> {
    const accountPayer = await this.accountRepository.findOne({ where: { id: transferDto.payer } }); 
    const accountPayee = await this.accountRepository.findOne({ where: { id: transferDto.payee } });
    
    if (!accountPayer || !accountPayee) {
      throw new HttpException('Account not found', HttpStatus.BAD_REQUEST);
    } else if (accountPayee.id === accountPayer.id) {
      throw new HttpException('The payer and payee accounts must be different', HttpStatus.BAD_REQUEST);
    }

    await this.hasPermissionForTransfer(accountPayer);
    await this.userHasBalance(accountPayer, transferDto.value);
    await this.transferValue(accountPayer, accountPayee, transferDto.value);

    return {
      message: 'Transfer completed successfully',
      value: transferDto.value,
      payer: accountPayer.id,
      payee: accountPayee.id,
      date: new Date(),
    }
  }

  async userHasBalance(accountPayer: Account, value: number): Promise<boolean> {
    let hasBalance = false;
    if (accountPayer.balance >= value) {
      hasBalance = true;
    } else {        
        throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
    }
    return hasBalance;
  }

  async hasPermissionForTransfer(payer: Account ): Promise<boolean> {
    const userId = payer.accountOwner;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const userType = user.typeUser;
    if (userType === 1) {
      return true;
    } else {
      throw new HttpException('No permission for transfer', HttpStatus.BAD_REQUEST);
    }
  }

  async transferValue(payerAccount: Account, payeeAccount: Account, value: number): Promise<void> {
    try {
      payerAccount.balance -= value;
      payeeAccount.balance += value;
      await this.accountRepository.update(payerAccount.id,payerAccount);
      await this.accountRepository.update(payeeAccount.id, payeeAccount);
      
      const createTransaction = {
        amountPaid: value,
        payer: payerAccount.id,
        payee: payeeAccount.id,
        value: value,
        date: new Date(),
      }
      await this.transactionRepository.save(createTransaction);
    } catch (error) {
      throw new HttpException('Error on transfer', HttpStatus.BAD_REQUEST);
    }
  }
}
