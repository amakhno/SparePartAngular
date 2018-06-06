import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthorizationService } from './authorization.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

@Injectable()
export class CustomHttp {
    headers = new Headers();
    /**
     *
     */
    constructor(private http: Http, private authorizationService: AuthorizationService, private router: Router) {
        if (this.authorizationService.apiKey != null) {
            this.headers.append('Authorization', 'Bearer ' + this.authorizationService.apiKey);
        }
    }

    get(url: string): Observable<Response> {
        const options: RequestOptions = new RequestOptions();
        options.headers = new Headers();
        return this.http.get(url, options);
    }

    post(url: string, body: any): Observable<Response> {
        const options: RequestOptions = new RequestOptions();
        options.headers = new Headers();
        if (this.authorizationService.apiKey != null) {
            options.headers.append('Authorization', 'Bearer ' + this.authorizationService.apiKey);
        }
        return this.http.post(url, body, options).catch(e => {
            if (e.status === 401) {
                this.handleError(e);
                return Observable.throw('Unauthorized + this.authorizationService.apiKey');
            }
        });
    }

    delete(url: string): Observable<Response> {
        const options: RequestOptions = new RequestOptions();
        options.headers = new Headers();
        if (this.authorizationService.apiKey != null) {
            options.headers.append('Authorization', 'Bearer ' + this.authorizationService.apiKey);
        }
        return this.http.delete(url, options).catch(e => {
            if (e.status === 401) {
                this.handleError(e);
                return Observable.throw('Unauthorized + this.authorizationService.apiKey');
            }
        });
    }

    put(url: string, body: any): Observable<Response> {
        const options: RequestOptions = new RequestOptions();
        options.headers = new Headers();
        if (this.authorizationService.apiKey != null) {
            options.headers.append('Authorization', 'Bearer ' + this.authorizationService.apiKey);
        }
        return this.http.put(url, body, options); /*.catch(e => {
            if (e.status === 401) {
                this.handleError(e);
                return Observable.throw('Unauthorized + this.authorizationService.apiKey');
            }
        });*/
    }

    private handleError(error: Response | any) {
        localStorage.removeItem('Token');
        this.authorizationService.apiKey = null;
        this.router.navigateByUrl('login');
        console.log('Unauthorized' + this.authorizationService.apiKey);
        return Observable.throw(error); // <= B
    }
}
