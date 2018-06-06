import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppSettings } from './app.settings';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AccountModule } from './account/account.module';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AdminModule } from './admin/admin.module';
import { FormsModule } from '@angular/forms';
import { MarkRest } from './model/marl.rest';
import { MarkRepository } from './model/mark.repository';
import { AdminGuard } from './guards/admin.guard';
import { CustomHttp } from './custom-http.service';
import { AuthorizationService } from './authorization.service';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexPageComponent } from './index-page/index-page.component';
import { SparePartRest } from './model/sparepart.rest';
import { Cart } from './cart.service';
import { registerLocaleData } from '@angular/common';
import localeRu from './ru';
import { CartComponent } from './cart/cart.component';

registerLocaleData(localeRu, 'ru');

const coreRootes: Routes = [
  { path: '', component: IndexPageComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AdminGuard] },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AccountModule,
    CalendarModule,
    BrowserAnimationsModule,
    FormsModule,
    CalendarModule,
    RouterModule.forRoot(coreRootes)
  ],
  providers: [
    AppSettings,
    MarkRest,
    MarkRepository,
    SparePartRest,
    AdminGuard,
    CustomHttp,
    AuthorizationService,
    Cart,
    {
      provide: LOCALE_ID,
      useValue: 'ru'
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
