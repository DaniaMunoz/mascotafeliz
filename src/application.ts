import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {EstrategiaCliente} from './strategies/cliente.strategy';
import {EstrategiaAdmin, EstrategiaEmpleado} from './strategies/empleado.strategy';

export {ApplicationConfig};

export class MascotafelizApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };







    //Si tenemos más estrategias del admin.strategy las añadimos aquí como linea 47
    //Las estrategias aplican cuando las LLAMAMOS en la parte de controller.
    registerAuthenticationStrategy(this, EstrategiaEmpleado);
    registerAuthenticationStrategy(this, EstrategiaCliente);
    registerAuthenticationStrategy(this, EstrategiaAdmin);
    this.component(AuthenticationComponent);
  }
}
