import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


export class EventosForm extends FormGroup {
    readonly id = this.get('id') as FormControl;
    readonly titulo = this.get('titulo') as FormControl;
    readonly mensaje = this.get('mensaje') as FormControl;
    readonly fecha = this.get('fecha') as FormControl;
    readonly hora_inicio = this.get('hora_inicio') as FormControl;
    readonly hora_fin = this.get('hora_fin') as FormControl;
    readonly rol_destinatario = this.get('rol_destinatario') as FormControl;
    readonly color = this.get('color') as FormControl;

    constructor(readonly fb: FormBuilder = new FormBuilder()) {
        super(
            fb.group({
                id: [''],
                titulo: ['', Validators.required],
                mensaje: ['', Validators.required],
                fecha: ['', Validators.required],
                hora_inicio: ['', Validators.required],
                hora_fin: ['', Validators.required],
                rol_destinatario: ['', Validators.required],
                color: ['#000000', [Validators.required]]
            }).controls
        );
    }
}