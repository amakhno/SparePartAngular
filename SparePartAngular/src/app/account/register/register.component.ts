import { Component } from '@angular/core'
import { AppSettings } from '../../app.settings';
import { NgForm } from '@angular/forms'
import { Http, RequestOptions } from '@angular/http';
import { CustomHttp } from '../../custom-http.service';
import { AuthorizationService } from '../../authorization.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',   
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    name: string;
    password: string;
    message:string = '';
    sended = false;

    constructor(private settings: AppSettings, private customHttp: CustomHttp, 
        private authorizationService:AuthorizationService) {

    }

    onSubmit(myForm: NgForm) {
        if (!myForm.valid) {
            this.sended = true;
            this.message = 'Не все поля заполнены корректно';
            return;
        }
        console.log(myForm);    
        this.authorizationService.register(this.name, this.password);
    }
}