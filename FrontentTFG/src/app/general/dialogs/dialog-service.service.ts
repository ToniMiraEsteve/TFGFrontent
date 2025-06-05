import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ErrorValDialogComponent } from './error-val-dialog/error-val-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private errorDialogRef: MatDialogRef<ErrorValDialogComponent, void>;


  constructor(private dialog: MatDialog) { }

  /**Genera un dialogo de error.
  * @titulo Titulo del dialogo
  * @cuerpo Mensaje dentro del dialogo
  * @options Si se envia se considera esa configuración para el dialogo, sino se añade una por defecto
 */
  openErrorDialog(titulo: string, cuerpo: string, options?: MatDialogConfig): void {
    let dialogConfig = new MatDialogConfig();

    if (options) {
      dialogConfig = options;
    } else {
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
    }

    dialogConfig.data = {
      titulo: titulo,
      description: cuerpo,
    };


    this.errorDialogRef = this.dialog.open(ErrorValDialogComponent, dialogConfig);
  }

  /**
   * Devuelve el resultado de cerrar el dialogo de error 
   * No expected return
   */
  closedErrorDialog(): Observable<void> {
    return this.errorDialogRef.afterClosed();
  }

}
