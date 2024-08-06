import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuario-login.entity';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  async validateUsuario(usuario: string, senha: string): Promise<any> {
    const buscarUsuario = await this.usuarioService.findByUsuario(usuario);

    if (!buscarUsuario)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    const mathSenha = await this.bcrypt.compararSenha(
      senha,
      buscarUsuario.senha,
    );

    if (buscarUsuario && mathSenha) {
      const { senha, ...resposta } = buscarUsuario;
      return resposta;
    }
    return null;
  }

  async login(usuarioLogin: UsuarioLogin) {
    const payload = { sub: usuarioLogin.usuario };
    const buscarUsuario = await this.usuarioService.findByUsuario(
      usuarioLogin.usuario,
    );

    return {
      id: buscarUsuario.id,
      nome: buscarUsuario.nome,
      usuario: usuarioLogin.usuario,
      senha: '',
      foto: buscarUsuario.foto,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
