import { ApiProperty } from "@nestjs/swagger";
import { Entity } from "typeorm";
@Entity({ name: 'tb_usuarios' })
export class UsuarioLogin {
  @ApiProperty()
  public usuario: string;
  @ApiProperty()
  public senha: string;
}
