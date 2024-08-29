import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.request.dto";

@Injectable()
export class UserService {
    constructor(){}
    //To do
    async createUser(user: CreateUserDto): Promise<User> {
        return null;
    }
}