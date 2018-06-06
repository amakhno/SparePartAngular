import { Component } from '@angular/core'
import { AppSettings } from '../../app.settings';
import { NgForm } from '@angular/forms'
import { Http, RequestOptions, Response } from '@angular/http';
import { AuthorizationService } from '../../authorization.service';
import { Router } from '@angular/router';

@Component({
    selector: 'signup-button',
    templateUrl: './signup-button.component.html'
})
export class SgnupButtonComponent {
    constructor(private settings: AppSettings, private authService: AuthorizationService, private router:Router) {

    }

    logOut() {
        this.authService.logOut();
        this.router.navigateByUrl('/');
    }
}