import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthStorage } from '../general/localStorage/auth.stroge';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string | undefined;
  password: string | undefined;

  constructor(private authService: AuthService, private authStorage: AuthStorage, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    if(this.email && this.password) {
      this.authService.attempAuth(this.email, this.password).subscribe(
        response => {
          console.log(response.body.data.token);
          
          this.authStorage.saveToken(response.body.data.token);
          this.authStorage.saveUser(response.body.data.user);
          console.log('Inicio de sesión exitoso');
          console.log('Token:', response.body.data.token);
          this.router.navigate(['/info']);
          if (response.status === 200) {
            if(!response.body) {
              console.log('No se ha podido iniciar sesión');
              
            } else {
              console.log(response.body);
              
            }
          }
        },
        err => {
          console.log(err);
      });
    }
  }

}
