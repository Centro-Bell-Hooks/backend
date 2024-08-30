import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';

// colocar depois tipo de usuário
// empresa 
// aluno
@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 50, nullable: false })
  @ApiProperty()
  nome: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 30, nullable: false })
  @ApiProperty({ example: 'email@email.com.br' })
  usuario: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 200, nullable: false })
  @ApiProperty()
  senha: string;

  @Column()
  @ApiProperty()
  foto: string;

  @OneToMany(() => Produto, (produto) => produto.usuario)
  @ApiProperty()
  produto: Produto[]
}
