import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ninyo } from '../models/ninyo';
import { NinyosService } from '../services/ninyos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ninyos',
  templateUrl: './ninyos.component.html',
  styleUrls: ['./ninyos.component.css']
})
export class NinyosComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre', 'curso', 'numero_contacto', 'nombre_padres', 'enfermedades_alergias', 'correo_id', 'opciones'];
  dataSource: MatTableDataSource<Ninyo> = new MatTableDataSource();

  constructor(private ninyosService: NinyosService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadNinyos();
  }

  loadNinyos(): void {

    this.ninyosService.getNinyos().subscribe(
      (data) => {
        console.log(data.data);
        this.dataSource.data = data.data;
      },
    );
  }

  ViewNinyo(ninyo: Ninyo): void {
    this.router.navigate(['/ninyos/view', ninyo.id], {relativeTo: this.activatedRoute});
  }

  edit(ninyo: Ninyo): void {
    this.router.navigate(['/ninyos/edit', ninyo.id], {relativeTo: this.activatedRoute});
  }

  delete(ninyo: Ninyo): void {
    this.ninyosService.deleteNinyo(ninyo.id).subscribe(
      (data) => {
        console.log(data);
        this.loadNinyos();
      },
      (error) => {
        console.error('Error deleting ninyo:', error);
      }
    );
  }

  createNinyo(): void {
    this.router.navigate(['/ninyos/edit'], {relativeTo: this.activatedRoute});
  }


}
