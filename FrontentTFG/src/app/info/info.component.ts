import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements AfterViewInit {
  index = 0;
  totalImagenes = 0;
  intervaloId: any;
  
  constructor() { }

  ngAfterViewInit(): void {
    this.totalImagenes = document.querySelectorAll('.imagen').length;
    this.iniciarIntervalo();
  }

  mover(direccion: number): void {
    this.index += direccion;

    if (this.index < 0) {
      this.index = this.totalImagenes - 1;
    } else if (this.index >= this.totalImagenes) {
      this.index = 0;
    }

    const imagenes = document.getElementById('imagenes');
    if (imagenes) {
      imagenes.style.transform = `translateX(${-this.index * 100}%)`;
    }

    this.reiniciarIntervalo();
  }

  iniciarIntervalo(): void {
    this.intervaloId = setInterval(() => {
      this.mover(1);
    }, 10000);
  }

  reiniciarIntervalo(): void {
    clearInterval(this.intervaloId);
    this.iniciarIntervalo();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervaloId);
  }

}
