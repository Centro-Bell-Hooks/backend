import { TypeOrmModule } from "@nestjs/typeorm";
import { Categoria } from "./entities/categoria.entity";
import { Module } from "@nestjs/common";


@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],
    providers: [],
    controllers: [],
    exports: [TypeOrmModule]
})

export class PostagemModule{}