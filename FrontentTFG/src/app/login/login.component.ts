import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string | undefined;
  password: string | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(): void {
    if(this.email && this.password) {
      this.authService.attempAuth(this.email, this.password).subscribe(
        response => {
          console.log("data");
          console.log(response.status);
          
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
