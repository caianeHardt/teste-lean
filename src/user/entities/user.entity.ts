import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Transaction } from '../../transfer/entities/transaction.entity';
import { UserType } from './user_type.entity';

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    email: string;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty()
    @Column({ nullable: false })
    document_number: string;

    @ManyToOne(() => UserType, userType => userType.id)
    @JoinColumn({ name: 'user_type' })
    userType: number;

    @ApiProperty()
    @Column({ name: 'created_at' })
    createdAt: Date;

    @ApiProperty()
    @Column({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => Transaction, transaction => transaction.payee)
    transferSentTo: Transaction;

    @OneToMany(() => Transaction, transaction => transaction.payer)
    transferSentFrom: Transaction;
}