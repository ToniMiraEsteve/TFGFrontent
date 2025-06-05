import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


export class PdfForm extends FormGroup{
    readonly nombre_apellidos = this.get('nombre_apellidos') as FormControl;
  readonly edad = this.get('edad') as FormControl;
  readonly fecha_nacimiento = this.get('fecha_nacimiento') as FormControl;
  readonly grupo = this.get('grupo') as FormControl;
  readonly nombre_tutor = this.get('nombre_tutor') as FormControl;
  readonly telefono_tutor = this.get('telefono_tutor') as FormControl;
  readonly expectativas = this.get('expectativas') as FormControl;
  readonly observaciones_medicas = this.get('observaciones_medicas') as FormControl;
  readonly tratamiento = this.get('tratamiento') as FormControl;
  readonly seguro = this.get('seguro') as FormControl;
  readonly numero_seguro = this.get('numero_seguro') as FormControl;
  readonly autorizacion_urgencias_nombre = this.get('autorizacion_urgencias_nombre') as FormControl;
  readonly autorizacion_urgencias_dni = this.get('autorizacion_urgencias_dni') as FormControl;
  readonly autorizacion_urgencias_fecha = this.get('autorizacion_urgencias_fecha') as FormControl;
  readonly autorizacion_imagen_nombre = this.get('autorizacion_imagen_nombre') as FormControl;
  readonly autorizacion_imagen_dni = this.get('autorizacion_imagen_dni') as FormControl;
  readonly autorizacion_imagen_fecha = this.get('autorizacion_imagen_fecha') as FormControl;

  constructor(fb: FormBuilder = new FormBuilder()) {
    super(fb.group({
      nombre_apellidos: ['', Validators.required],
      edad: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      grupo: [''],
      nombre_tutor: ['', Validators.required],
      telefono_tutor: [''],
      expectativas: [''],
      observaciones_medicas: [''],
      tratamiento: [''],
      seguro: [''],
      numero_seguro: [''],
      autorizacion_urgencias_nombre: ['', Validators.required],
      autorizacion_urgencias_dni: ['', Validators.required],
      autorizacion_urgencias_fecha: ['', Validators.required],
      autorizacion_imagen_nombre: ['', Validators.required],
      autorizacion_imagen_dni: ['', Validators.required],
      autorizacion_imagen_fecha: ['', Validators.required],
    }).controls);
  }
}
