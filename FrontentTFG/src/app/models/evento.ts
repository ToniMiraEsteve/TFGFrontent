export interface Evento {
    id: number;
    titulo: string;
    mensaje: string;
    fecha: Date | string;
    hora_inicio: string;
    hora_fin: string;
    rol_destinatario: string;
    color: string;
  }
  