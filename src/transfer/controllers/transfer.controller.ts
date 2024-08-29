import { Controller, Post, Body } from '@nestjs/common';
import { TransferRequestDto, TransferResponseDto } from '../../transfer/dto/transfer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransferService } from '../services/transfer.service';

@ApiTags('Transfer')
@Controller()
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @ApiOperation({ summary: 'Transfer value between accounts' })
  @Post('/transfer')
  async transfer(@Body()transferDto: TransferRequestDto): Promise<TransferResponseDto> {
    await this.transferService.transfer(transferDto);
    return null;
  }
}
