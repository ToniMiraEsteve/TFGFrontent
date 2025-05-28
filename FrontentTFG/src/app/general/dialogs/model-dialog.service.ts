import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { Usuario } from 'src/app/models/usuario';
import { MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModelDialogService {

  private usuarioDialogRef: MatDialogRef<UserDialogComponent, Usuario | false>;

  constructor(private dialog: MatDialog) { }

  openUsuarioDialog(mobile?: boolean, options?: MatDialogConfig): void {
    let dialogConfig = new MatDialogConfig();

    if (options) {
      dialogConfig = options;
    } else {
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
    }

    this.usuarioDialogRef = this.dialog.open(UserDialogComponent, dialogConfig);

    if (mobile !== undefined) {
      this.usuarioDialogRef.componentInstance['mobile'] = mobile;
    }
  }

  closedUsuarioDialog(): Observable<Usuario | false | undefined> {
    return this.usuarioDialogRef.afterClosed();
  }

}
