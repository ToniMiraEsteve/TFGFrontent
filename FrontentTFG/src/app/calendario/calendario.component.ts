import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { Rol } from '../enums/rol.enum';
import { AuthStorage } from '../general/localStorage/auth.stroge';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/evento';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ModelDialogService } from '../general/dialogs/model-dialog.service';
import * as moment from 'moment';

registerLocaleData(localeEs);

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;  

  lastClickTime: number = 0;
  lastClickDate: Date | null = null;

  locale: string = 'es';

  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;

  lastClick: number | null = null;

  events: CalendarEvent[] = [];

  userRol: Rol | null = null;
  Roles = Rol;

  eventoSeleccionado: any = null;

  constructor(
    private authStorage: AuthStorage,
    private eventoService: EventoService,
    private modelDialogService: ModelDialogService
  ) { }

  ngOnInit(): void {
    this.userRol = this.authStorage.getRol();
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventoService.getEventos().subscribe(
      (res) => {
        const eventos = res.data;
        console.log('Eventos cargados:', eventos);
        this.events = eventos.filter(event =>
          event.rol_destinatario === 'todos' || event.rol_destinatario === this.userRol
        ).map(event => ({
          start: new Date(`${event.fecha}T${event.hora_inicio}`),
          end: new Date(`${event.fecha}T${event.hora_fin}`),
          title: event.titulo,
          color: { primary: event.color, secondary: event.color },
          meta: event,
        }));
      },
      (err) => {
        console.error('Error al cargar eventos', err);
      }
    );
  }

  onDayDoubleClick(date: Date): void {
    if(this.userRol == Rol.Junta || this.userRol == Rol.Monitor || this.userRol == Rol.Admin){
      const nuevoEvento: Partial<Evento> = {
        fecha: moment(date).format('YYYY-MM-DD'), 
      };     
    
      const dialogRef = this.modelDialogService.openEventDialog(nuevoEvento, false, {
        width: '40%',
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadEvents();
        }
      });
    }
  }

  onDayClick({ day }: { day: { date: Date } }): void {
    const date = new Date(day.date);
    const now = new Date().getTime();
  
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.warn('Fecha inválida:', date);
      return;
    }
  
    if (
      this.lastClickDate instanceof Date &&
      this.lastClickDate.getFullYear() === date.getFullYear() &&
      this.lastClickDate.getMonth() === date.getMonth() &&
      this.lastClickDate.getDate() === date.getDate() &&
      now - this.lastClickTime < 500
    ) {
      this.onDayDoubleClick(date);
    }
  
    this.lastClickDate = date;
    this.lastClickTime = now;
  }
  
  
  

  openEventDialog( mobile: boolean = false): void {
    const dialogRef = this.modelDialogService.openEventDialog(null, mobile, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEvents();
      }
    });
  }

  mostrarEvento(event: CalendarEvent) {
    this.eventoSeleccionado = event.meta;
  }
  
  cerrarSidebar() {
    this.eventoSeleccionado = null;
  }

  previousMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
  }

  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
  }

  borrar(): void{
    this.eventoService.deleteEvento(this.eventoSeleccionado.id).subscribe(
      (res) => {
        console.log('Evento borrado:', res);
        this.eventoSeleccionado = null; 
        this.loadEvents();
      }
      , (err) => {
        console.error('Error al borrar el evento', err);
      });
  }
}
