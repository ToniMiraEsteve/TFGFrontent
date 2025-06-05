import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ninyo } from '../models/ninyo';

export class NinyoForm extends FormGroup {
  readonly id = this.get('id') as FormControl;
  readonly nombre = this.get('nombre') as FormControl;
  readonly curso = this.get('curso') as FormControl;
  readonly nombre_padres = this.get('nombre_padres') as FormControl;
  readonly numero_contacto = this.get('numero_contacto') as FormControl;
  readonly correo_id = this.get('correo_id') as FormControl;
  readonly enfermedades_alergias = this.get('enfermedades_alergias') as FormControl;
  readonly observaciones = this.get('observaciones') as FormControl;

  constructor(readonly ninyo: Ninyo, readonly fb: FormBuilder = new FormBuilder()) {
    super(
      fb.group({
        id: [ninyo?.id],
        nombre: [ninyo?.nombre, Validators.required],
        curso: [ninyo?.curso],
        nombre_padres: [ninyo?.nombre_padres],
        numero_contacto: [ninyo?.numero_contacto],
        correo_id: [ninyo?.correo_id, Validators.email],
        enfermedades_alergias: [ninyo?.enfermedades_alergias],
      }).controls
    );
  }
}
