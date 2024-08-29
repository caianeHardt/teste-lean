import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Transaction {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ name: 'amount_paid' })
    amountPaid: number;

    @ApiProperty()
    @Column()
    payee: number;

    @ApiProperty()
    @Column()
    payer: number;

    @ApiProperty()
    @Column({ name: 'created_at' })
    createdAt: Date;

    @ApiProperty()
    @Column({ name: 'updated_at' })
    updatedAt: Date;
}