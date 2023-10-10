import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../items/entities/item.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SeedService {
    private isProd: boolean;

    constructor(
        private readonly configService: ConfigService,

        @InjectRepository( Item )
        private readonly itemsRepository: Repository<Item>,

        @InjectRepository( User )
        private readonly usersRepository: Repository<User>,
    ) {
        this.isProd = configService.get('STATE') === 'prod';
    }

    async executeSeed() {
        if( this.isProd ) {
            throw new UnauthorizedException('No se puede ejecutar el SEED en producción.');
        }

        /* Limpiando la base de datos - Borrar todo */
        await this.deleteDatabase();

        /* Crear usuarios */


        /* Crear items */


        return true;
    }

    async deleteDatabase() {
        /* Se borra items */
        await this.itemsRepository.createQueryBuilder().delete().where({}).execute();

        /* Se borra usuarios */
        await this.usersRepository.createQueryBuilder().delete().where({}).execute();
    }
}
