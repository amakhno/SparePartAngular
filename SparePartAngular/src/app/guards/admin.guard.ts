import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AuthorizationService } from "../authorization.service";

@Injectable()
export class AdminGuard implements CanActivate{
    /**
     *
     */
    constructor(private router:Router, private authServ: AuthorizationService) {        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {    
        if (this.authServ.role == 'Admin') {
            return true;
        }    
        return false;
        /*if (confirm('Вы уверены, что хотите перейти?'))
            return true;
        else {
            this.router.navigate(['']);
            return false;
        }*/
    }
}