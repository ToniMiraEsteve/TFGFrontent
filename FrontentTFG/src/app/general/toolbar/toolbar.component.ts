import { Component, OnInit, Input } from '@angular/core';
import { AuthStorage } from '../localStorage/auth.stroge';
import { ModelDialogService } from '../dialogs/model-dialog.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Rol, RolHelper } from 'src/app/enums/rol.enum';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() mobile: boolean = false;
  @Input() rutaActiva: string = '';

  Roles = Rol;

  rol: Rol | null;

  userLogged: boolean = false;

  constructor(private authStorage: AuthStorage, private modelDialogService: ModelDialogService, private authService: AuthService
              ,private router: Router) { }

  ngOnInit(): void {
    this.authStorage.currentUser$.subscribe(user => {
      this.rol = RolHelper.toEnum(user?.rol ?? null); 
    });
    console.log(this.rol);
    
    this.authStorage.loggedIn$.subscribe(isLogged => {
      this.userLogged = isLogged;
    });
    console.log('Usuario logueado:', this.userLogged);
    
  }

  toggleMenu() {
    console.log('Menú lateral abierto');
  }

  openUserMenu() {
    const userMenu = this.authStorage.getUser();
    this.modelDialogService.openUsuarioDialog(false, {
      width: '40%'
    });
    
  }

  logout():void{
    this.authStorage.signOut();
    this.authService.logout().subscribe(
      response => {
        console.log('Logout exitoso');
      },
    )
    this.router.navigate(['/']);
  }

}
