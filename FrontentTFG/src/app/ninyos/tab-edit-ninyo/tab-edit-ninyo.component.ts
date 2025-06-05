import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NinyoForm } from 'src/app/forms/NinyosForm';
import { Ninyo } from 'src/app/models/ninyo';
import { ActivatedRoute } from '@angular/router';
import { NinyosService } from 'src/app/services/ninyos.service';
import { DialogService } from 'src/app/general/dialogs/dialog-service.service';
import { Curso, CursoHelper } from 'src/app/enums/curso.enum';




@Component({
  selector: 'app-tab-edit-ninyo',
  templateUrl: './tab-edit-ninyo.component.html',
  styleUrls: ['./tab-edit-ninyo.component.css']
})
export class TabEditNinyoComponent implements OnInit {

  ninyoForm = new NinyoForm(new Ninyo());

  cursos = CursoHelper.equivalenceToString();

  archivoFotos: File | null = null;
  archivoSIP: File | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private ninyoService: NinyosService, private dialogService: DialogService) { }

  ngOnInit(): void {
    if(this.route.firstChild){
      this.route.firstChild?.params.subscribe(params => {
        this.ninyoService.getNinyoById(params.id).subscribe(
          (response: any) => {
            const ninyoData = response.data;
            this.ninyoForm = new NinyoForm(ninyoData);
            this.ninyoForm.patchValue(ninyoData);
          },
          (error) => {
            console.log(error);
          }
        );
      });
    }
  }

  guardar(): void {
    this.ninyoForm.markAllAsTouched();
    if(this.ninyoForm.valid){

      if (!this.ninyoForm.value['id']) {
        delete this.ninyoForm.value['id'];
      }
      if(this.ninyoForm.value['id'] === null || this.ninyoForm.value['id'] === undefined){
        this.ninyoService.createNinyo(this.ninyoForm.value).subscribe(
          (data: Ninyo) => {
            
            this.router.navigate(['/ninyos']);
          },(error) => {
            if(error.error.errorType === "Unique"){
              this.dialogService.openErrorDialog('Error guardado','Ya existe un cliente con el nombre: '+error.error.unique);
            }
          }
        );
      }else{
        this.ninyoService.editNinyo(this.ninyoForm.value).subscribe(
          (data: Ninyo) => {
            this.router.navigate(['/ninyos']);
          },(error) => {
            if(error.error.errorType === "Unique"){
              this.dialogService.openErrorDialog('Error guardado','Ya existe un cliente con el nombre: '+error.error.unique);
            }
          }
        )
      }
    }
  }

  cancelar(): void{
    this.router.navigate(['/ninyos']);
  }


}
