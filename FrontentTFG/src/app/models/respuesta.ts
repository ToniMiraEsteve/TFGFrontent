export interface Respuesta {
  id: number;
  contenido: string;
  post_id: number;
  fecha: string;
  desactivado: boolean;
  usuario: {
    id: number;
    name: string;
  };
}
