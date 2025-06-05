export enum Curso {
    QuintoPrimaria = '5º Primaria',
    SextoPrimaria = '6º Primaria',
    PrimeroESO = '1º ESO',
    SegundoESO = '2º ESO',
    TerceroESO = '3º ESO',
    CuartoESO = '4º ESO',
  }
  
  export namespace CursoHelper {
    export function toString(curso: Curso): string {
      switch (curso) {
        case Curso.QuintoPrimaria:
          return '5º Primaria';
        case Curso.SextoPrimaria:
          return '6º Primaria';
        case Curso.PrimeroESO:
          return '1º ESO';
        case Curso.SegundoESO:
          return '2º ESO';
        case Curso.TerceroESO:
          return '3º ESO';
        case Curso.CuartoESO:
          return '4º ESO';
        default:
          return '';
      }
    }
  
    export function toEnum(curso: string): Curso | null {
      if (!curso) return null;
  
      switch (curso.toLowerCase()) {
        case '5º primaria':
          return Curso.QuintoPrimaria;
        case '6º primaria':
          return Curso.SextoPrimaria;
        case '1º eso':
          return Curso.PrimeroESO;
        case '2º eso':
          return Curso.SegundoESO;
        case '3º eso':
          return Curso.TerceroESO;
        case '4º eso':
          return Curso.CuartoESO;
        default:
          return null;
      }
    }
  
    export function equivalenceToString(): { value: Curso, viewValue: string }[] {
      return [
        { value: Curso.QuintoPrimaria, viewValue: toString(Curso.QuintoPrimaria) },
        { value: Curso.SextoPrimaria, viewValue: toString(Curso.SextoPrimaria) },
        { value: Curso.PrimeroESO, viewValue: toString(Curso.PrimeroESO) },
        { value: Curso.SegundoESO, viewValue: toString(Curso.SegundoESO) },
        { value: Curso.TerceroESO, viewValue: toString(Curso.TerceroESO) },
        { value: Curso.CuartoESO, viewValue: toString(Curso.CuartoESO) }
      ];
    }
  }
  