import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { AuthorizationService } from './authorization.service';
import { Cart } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  dateValue: Date;

  constructor(private http: Http, private authService: AuthorizationService, private cart: Cart) {
  }

  /**
   * isAuth
   */
  public isAuth(): boolean {
    if (this.authService.apiKey != null && this.authService.apiKey.length > 0) {
      return true;
    }
    return false;
  }

  public isCartEmpty() : boolean{
    return this.cart.cartPositions.length == 0;
  }

  public cartPositionsCount() : number {
    return this.cart.cartPositions.length;
  }

  public userName(): string {
    return this.authService.name;
  }

  public logOut(): any {
    this.authService.logOut();
  }  
}
