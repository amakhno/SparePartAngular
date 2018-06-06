import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { FormsModule } from '@angular/forms'
import { SgnupButtonComponent } from "./signup-button/signup-button.component";
import { CommonModule } from "@angular/common";


@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [LoginComponent, RegisterComponent, SgnupButtonComponent],
    exports: [LoginComponent, RegisterComponent, SgnupButtonComponent]
})
export class AccountModule {
    
}