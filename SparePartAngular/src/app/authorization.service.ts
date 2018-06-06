import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AppSettings } from "./app.settings";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

@Injectable()
export class AuthorizationService {
    name = 'Trane';
    role = 'Admin';
    apiKey : string;
    /**
     *
     */
    constructor(private http: Http, private appSettings: AppSettings, private router:Router) {
        if (localStorage.getItem('Token') != null) {
            this.name = 'Trane';
            this.role = 'Admin';
            this.apiKey = localStorage.getItem('Token');
        }
        else {
            this.auth('Trane', '134679Az');
        }        
    }

    authorize(username: string, password: string): Observable<boolean> {
        return this.http.post(this.appSettings.ApiUrl + '/api/Account/Token', { username: username, password: password } as LoginInfo)
            .map(data => {
                console.log(data.json());
                this.name = data.json().username;
                console.log(this.name);
                this.role = data.json().role;
                console.log(this.role);
                this.apiKey = data.json().access_token;
                console.log(this.apiKey);
                return true;
            });
    }

    register(username: string, password: string) {
        this.http.post(this.appSettings.ApiUrl + '/api/account/register', { username: username, password: password } as LoginInfo)
            .subscribe(data => {
                if (data.json().userName != null) {
                    this.auth(username, password);       
                }
            });
    }

    logOut(): void {
        this.name = null;
        this.apiKey = null;
        this.role = null;
    }

    auth(username:string, password:string) {
        this.http.post(this.appSettings.ApiUrl + '/api/Account/Token', { username: username, password: password } as LoginInfo)
                    .subscribe(data=>{
                        var dataJson = data.json();
                        this.name = dataJson.username;
                        this.role = dataJson.role;
                        this.apiKey = dataJson.access_token;
                        localStorage.setItem('Token', dataJson.access_token);
                    });
    }
}

class LoginInfo {
    username: string;
    password: string;
}