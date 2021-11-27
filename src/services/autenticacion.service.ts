import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Cliente, Empleado} from '../models';
import {ClienteRepository, EmpleadoRepository} from '../repositories';

const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository
  ) { }

  /*
   * Add service methods here
   */

  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }


  //Empleado
  IdentificarEmpleado(usuario: string, clave: string) {
    try {
      let e = this.empleadoRepository.findOne({where: {correo: usuario, clave: clave}});
      if (e) {
        return e;
      }
      return false;
    } catch {
      return false;
    }
  }

  GenerarTokenJWT(empleado: Empleado) {
    let token = jwt.sign({
      data: {
        id: empleado.empleadoId,
        correo: empleado.correo,
        nombre: empleado.nombres + " " + empleado.apellidos,
        nivel: empleado.nivel
      }
    },
      Llaves.claveJWT);
    return token;

  }

  //Cliente
  IdentificarCliente(usuario: string, clave: string) {
    try {
      let c = this.clienteRepository.findOne({where: {correo: usuario, clave: clave}});
      if (c) {
        return c;
      }
      return false;
    } catch {
      return false;
    }
  }


  GenerarTokencJWT(cliente: Cliente) {
    let token = jwt.sign({
      data: {
        id: cliente.clienteId,
        correo: cliente.correo,
        nombre: cliente.nombres + " " + cliente.apellidos,
        ciudad: cliente.ciudad
      }
    },
      Llaves.claveJWT);
    return token;

  }

  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;

    } catch {
      return false;

    }
  }

















  /* IdentificarUsuario(usuario: string, clave: string) {
    try {
      let e = this.empleadoRepository.findOne({where: {correo: usuario, clave: clave}});
      let c = this.clienteRepository.findOne({where: {correo: usuario, clave: clave}});
      if (e) {
        return e;

      }
      if (c) {
        return c;
      }
      return false;
    } catch {
      return false;
    }


  }

  GenerarTokenJWT(empleado: Empleado, cliente: Cliente) {
    let token = jwt.sign(
      {
        if(empleado: Empleado) {
          data:
          {
            id: empleado.empleadoId
            correo: empleado.correo
            nombre: empleado.nombres + " " + empleado.apellidos
            nivel: empleado.nivel
          }
        },
        else:
        {
          data:
          {
            id: cliente.clienteId,
            correo: cliente.correo,
            nombre: empleado.nombres + " " + empleado.apellidos
          }
        }
      },
        Llaves.claveJWT);
      return token;

  } */






}
