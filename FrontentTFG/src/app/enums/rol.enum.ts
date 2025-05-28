export enum Rol {
    Admin = 'admin',
    Junta = 'junta',
    Monitor = 'monitor',
    Usuario = 'usuario',
    toEnum = "toEnum"
  }
  
  export namespace RolHelper {
    export function toString(rol: Rol): string {
      switch (rol) {
        case Rol.Admin:
          return 'Administrador';
        case Rol.Junta:
          return 'Junta';
        case Rol.Monitor:
          return 'Monitor';
        case Rol.Usuario:
          return 'Usuario';
        default:
          return '';
      }
    }
  
    export function toEnum(rol: string): Rol | null {
      if (!rol) return null;
  
      switch (rol.toLowerCase()) {
        case 'admin':
          return Rol.Admin;
        case 'junta':
          return Rol.Junta;
        case 'monitor':
          return Rol.Monitor;
        case 'usuario':
          return Rol.Usuario;
        default:
          return null;
      }
    }
  
    export function equivalenceToString(): { value: Rol, viewValue: string }[] {
      return [
        { value: Rol.Admin, viewValue: toString(Rol.Admin) },
        { value: Rol.Junta, viewValue: toString(Rol.Junta) },
        { value: Rol.Monitor, viewValue: toString(Rol.Monitor) },
        { value: Rol.Usuario, viewValue: toString(Rol.Usuario) }
      ];
    }
  }
  