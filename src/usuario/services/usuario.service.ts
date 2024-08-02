import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";

@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Brypt
    ){}

    async findByUser(user: string): Promise<Usuario | undefined> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: user
            }
        });
    };

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
    };

    async findById(id: number): Promise<Usuario> {

        let user = await this.usuarioRepository.findOne({
            where: {
                id
            }
        });

        if (!user)
            throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);

        return user;
    };

    async create(user: Usuario): Promise<Usuario> {

        let findUser = await this.findByUser(user.usuario);

        if (!findUser){
            user.senha = await this.bcrypt.criptografarSenha(user.senha)
            return await this.usuarioRepository.save(user)
        }

        throw new HttpException('O usuario já existe', HttpStatus.BAD_REQUEST);
    };

    async update(user: Usuario): Promise<Usuario> {
        let updateUser: Usuario = await this.findById(user.id)
        let buscaUsuario = await this.findByUser(user.usuario)

        if (!updateUser)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND)

        if (buscaUsuario && buscaUsuario.id !== user.id)
            throw new HttpException('Usuario (E-mail) já cadastrado!', HttpStatus.BAD_REQUEST)

        user.senha = await this.bcrypt.criptografarSenha(user.senha)
        return await this.usuarioRepository.save(user)
    };
}