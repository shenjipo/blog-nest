import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
    controllers: [UserController],
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers: [
        UserService,
        UserRepository
    ],
    exports: [
        UserService
    ],
})
export class UserModule { }