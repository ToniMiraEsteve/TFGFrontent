import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario';
import { AuthStorage } from '../../localStorage/auth.stroge';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  user: Usuario;

  constructor(public dialogRef: MatDialogRef<UserDialogComponent, Usuario | false>, private authStorage: AuthStorage) {}

  ngOnInit(): void {
    this.user  = this.authStorage.getUser();
  }

  cerrar(): void {
    this.dialogRef.close();
  }

}
