import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Account {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @OneToOne(() => User, { eager: true })
    @JoinColumn({ name: 'account_owner' })    
    accountOwner: number;

    @ApiProperty()
    @Column()
    active: boolean;

    @ApiProperty()
    @Column()
    balance: number;

    @ApiProperty()
    @Column({ name: 'created_at' })
    createdAt: Date;

    @ApiProperty()
    @Column({ name: 'updated_at' })
    updatedAt: Date;
}