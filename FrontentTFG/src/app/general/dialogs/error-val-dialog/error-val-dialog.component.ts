import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-val-dialog',
  templateUrl: './error-val-dialog.component.html',
  styleUrls: ['./error-val-dialog.component.css']
})
export class ErrorValDialogComponent implements OnInit {

  titulo: string;
  description: string;

  constructor(
      private dialogRef: MatDialogRef<ErrorValDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data : any) {
        this.titulo = data.titulo;
        this.description = data.description;
  }

  ngOnInit(): void {

  }

  close(): void {
      this.dialogRef.close();
  }

}
