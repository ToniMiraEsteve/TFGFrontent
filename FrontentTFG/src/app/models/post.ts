import { Respuesta } from './respuesta';

export interface Post {
  id: number;
  contenido: string;
  fecha: string;
  visibilidad: string;
  desactivado: boolean;
  usuario: {
    id: number;
    name: string;
  };
  respuestas: Respuesta[];
}
