import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserTypeEnum } from '../enum/user-type.enum';

@Entity()
export class UserType {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    type: UserTypeEnum;

    @ApiProperty()
    @Column({name: 'make_payment'})
    makePayment: boolean;

    @ApiProperty()
    @Column({ name: 'created_at' })
    createdAt: Date;

    @ApiProperty()
    @Column({ name: 'updated_at' })
    updatedAt: Date;
}