import { Component, OnInit } from '@angular/core';
import { NinyosService } from 'src/app/services/ninyos.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Ninyo } from '../../models/ninyo';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-view-ninyo',
  templateUrl: './tab-view-ninyo.component.html',
  styleUrls: ['./tab-view-ninyo.component.css']
})
export class TabViewNinyoComponent implements OnInit {

  dataSource: MatTableDataSource<Ninyo> = new MatTableDataSource();

  constructor(private ninyoService: NinyosService, private route: ActivatedRoute,  private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.route.firstChild?.params.subscribe(params => {
      this.ninyoService.getNinyoById(params.id).subscribe(
        (data) => {
          console.log(data);
          this.dataSource.data = [data.data];
        }
      );
    });
  }
  

  loadNinyo(id: Number): void {
    this.ninyoService.getNinyoById(id).subscribe(
      (data) => {
        console.log(data);
        this.dataSource.data = [data.data];

      }
    );
  }

  volverAtras() {
    this.router.navigate(['/ninyos']);
  }

}
