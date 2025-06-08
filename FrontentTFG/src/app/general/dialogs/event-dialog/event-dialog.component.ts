import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { EventosForm } from 'src/app/forms/EventosForm';
import { EventoService } from 'src/app/services/evento.service';


@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent implements OnInit {
  eventoForm: EventosForm;
  esEdicion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Evento | null,
    private eventoService: EventoService
  ) {
    this.esEdicion = !!data;
    this.eventoForm = new EventosForm(this.fb);

    if (this.data) {
      const dataCopy = { ...this.data };
      
      if (typeof dataCopy.fecha === 'string') {
        const [year, month, day] = dataCopy.fecha.split('-').map(Number);
        dataCopy.fecha = new Date(year, month - 1, day);
        console.log('hola' + dataCopy.fecha);

      }
      this.eventoForm.patchValue(dataCopy);
    }
  }

  ngOnInit(): void {}

  guardar() {
    if (this.eventoForm.valid) { 
      let evento: Evento = {
        ...this.data ?? {},
        ...this.eventoForm.value,
      };
  
      const fechaRaw = this.eventoForm.value.fecha;

      if (fechaRaw && Object.prototype.toString.call(fechaRaw) === '[object Date]') {
        const year = fechaRaw.getFullYear();
        const month = (fechaRaw.getMonth() + 1).toString().padStart(2, '0');
        const day = fechaRaw.getDate().toString().padStart(2, '0');
        evento.fecha = `${year}-${month}-${day}`; 
      } else if (typeof fechaRaw === 'string') {
        evento.fecha = fechaRaw.split('T')[0];
      }
  
      if (evento.hora_inicio && evento.hora_inicio.length > 5) {
        evento.hora_inicio = evento.hora_inicio.substring(0,5);
      }
      if (evento.hora_fin && evento.hora_fin.length > 5) {
        evento.hora_fin = evento.hora_fin.substring(0,5);
      }
  
      if (!evento.id || evento.id === null) {
        delete evento.id;
        this.esEdicion = false; 
      }

      if (this.esEdicion) {
        this.eventoService.editEvento(evento).subscribe({
          next: (res) => this.dialogRef.close(res),
          error: (err) => console.error('Error editando evento', err)
        });
      } else {
        this.eventoService.createEvento(evento).subscribe({
          next: (res) => this.dialogRef.close(res),
          error: (err) => console.error('Error creando evento', err)
        });
      }
    }
  }
  

  cancelar() {
    this.dialogRef.close(false);
  }

}
