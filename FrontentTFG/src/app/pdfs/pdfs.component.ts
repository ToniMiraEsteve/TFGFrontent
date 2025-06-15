import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PdfsService } from '../services/pdfs.service';
import { PdfForm } from '../forms/pdf-form';
import { AuthStorage } from '../general/localStorage/auth.stroge';

@Component({
  selector: 'app-pdfs',
  templateUrl: './pdfs.component.html',
  styleUrls: ['./pdfs.component.css']
})
export class PdfsComponent implements OnInit {

  pdfForm = new PdfForm();
  pdfUrl: string | null = null;


  constructor(private fb: FormBuilder, private pdfService: PdfsService, private authStorage: AuthStorage) {}

  
  ngOnInit(): void {
    if (this.pdfForm.valid) {
      this.pdfUrl = 'generado';
    }
  }

  onSubmit(): void {
    const datosFormulario = this.pdfForm.value;

    const payload = {
      user_id: this.authStorage.getUser()?.id, 
      datos_form: datosFormulario,
      estado: 'pendiente',
      desactivado: false
    };

    this.pdfService.crearPdf(payload).subscribe({
      next: (res) => {
        if (res.data['url']) {          
          const url = `http://52.205.115.137${res.data['url']}`;
          this.pdfUrl = url; 
        }
      },
      error: (err) => {
        console.error('Error al enviar el formulario', err);
      }
    });
  }

  volverAlFormulario() {
    this.pdfUrl = null;
    this.pdfForm.reset();
  }
}
