import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { Rol } from '../enums/rol.enum';
import { AuthStorage } from '../general/localStorage/auth.stroge';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/evento';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;  


  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;

  events: CalendarEvent[] = [];

  userRol: Rol | null;
  Roles = Rol;

  constructor(private authStorage: AuthStorage, private eventoService: EventoService ) { }

  ngOnInit(): void {
    this.userRol = this.authStorage.getRol();
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventoService.getEventos().subscribe(
            (res) => {
        this.events = res.map(event => ({
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
}
