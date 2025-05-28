import { Component, OnInit } from '@angular/core';
import { NinyosService } from 'src/app/services/ninyos.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Ninyo } from '../../models/ninyo';

@Component({
  selector: 'app-tab-view-ninyo',
  templateUrl: './tab-view-ninyo.component.html',
  styleUrls: ['./tab-view-ninyo.component.css']
})
export class TabViewNinyoComponent implements OnInit {

  dataSource: MatTableDataSource<Ninyo> = new MatTableDataSource();

  constructor(private ninyoService: NinyosService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('ID from route:', id);
      if (id) {
        this.loadNinyo(+id);
      }
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

}
