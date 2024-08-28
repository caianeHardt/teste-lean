export class TransferRequestDto {
    value: number;
    payer: number;
    payee: number;
}

export class TransferResponseDto {
    message: string;
    value: number;
    payer: number;
    payee: number;
    date: Date;
}