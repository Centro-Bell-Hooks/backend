import { TypeOrmModule } from "@nestjs/typeorm";
import { Categoria } from "./entities/categoria.entity";
import { Module } from "@nestjs/common";
import { CategoriaService } from "./services/categoria.service";

@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],
    providers: [CategoriaService],
    controllers: [],
    exports: [TypeOrmModule]
})

export class CategoriaModule{}