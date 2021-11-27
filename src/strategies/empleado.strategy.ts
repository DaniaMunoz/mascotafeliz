import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';

export class EstrategiaEmpleado implements AuthenticationStrategy {
  name: string = 'asesor';

  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService) {

  }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let datos = this.servicioAutenticacion.ValidarTokenJWT(token);
      if (datos.data.nivel == "Asesor") {
        //if (datos.data.role) para roles
        //let perfil: UserProfile = Object.assign({
        //nombre: datos.data.nombre
        return datos.data
        //});
        return datos.data;
      } else {
        throw new HttpErrors[401]("El token incluido no es válido")
      }
    } else {
      throw new HttpErrors[401]("No se ha incluido el token en la solicitud")

    }
  }



}
