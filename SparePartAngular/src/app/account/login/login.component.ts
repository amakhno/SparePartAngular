import { Component } from '@angular/core'
import { AppSettings } from '../../app.settings';
import { NgForm } from '@angular/forms'
import { Http, RequestOptions, Response } from '@angular/http';
import { AuthorizationService } from '../../authorization.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    name: string = "Trane";
    password: string = "134679";

    constructor(private settings: AppSettings, private http: Http, private authService: AuthorizationService,
        private router: Router) {

    }

    onSubmit(myForm: NgForm) {
        this.authService.authorize(this.name, this.password).subscribe(data => {
            console.log(data + ' ' + this.authService.apiKey);
            this.router.navigateByUrl('/');
        },
            (error) => {
                console.log(error._body);
                alert('Ошибка входа');
                return true;
            }
        );
    }
}