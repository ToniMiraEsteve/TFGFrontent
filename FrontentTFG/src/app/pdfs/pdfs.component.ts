import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PdfsService } from '../services/pdfs.service';
import { PdfForm } from '../forms/pdf-form';

@Component({
  selector: 'app-pdfs',
  templateUrl: './pdfs.component.html',
  styleUrls: ['./pdfs.component.css']
})
export class PdfsComponent implements OnInit {

  pdfForm = new PdfForm();
  pdfUrl: string | null = null;


  constructor(private fb: FormBuilder, private pdfService: PdfsService) {}


  
  ngOnInit(): void {
  }

  onSubmit(): void {
    const datosFormulario = this.pdfForm.value;

    const payload = {
      user_id: 1, // Sustituye por el ID real del usuario si hace falta
      datos_form: datosFormulario,
      estado: 'pendiente',
      desactivado: false
    };

    this.pdfService.crearPdf(payload).subscribe({
      next: (res) => {
        console.log('PDF guardado correctamente', res);
        alert('Formulario enviado y PDF generado');
        if (res.data['url']) {
          console.log(res.data['url']);
          
          const url = `http://localhost${res.data['url']}`;
          this.pdfUrl = url; 
        }
      },
      error: (err) => {
        console.error('Error al enviar el formulario', err);
      }
    });

    
    
  }
}
