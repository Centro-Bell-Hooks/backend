import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Categorias')
@Entity({ name: 'tb_categorias' })
@ApiBearerAuth()
export class Categoria {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  tipo: string;

  @ApiProperty()
  @Column({ length: 255 })
  cargo: string;

  @ApiProperty()
  @OneToMany(() => Produto, (produto) => produto.categoria)
  produto: Produto[];
}
