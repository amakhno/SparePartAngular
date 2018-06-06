import { NgModule } from '@angular/core';
import { MarkFormComponent } from './mark-form/mark-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { SparePartFormComponent } from './spare-part-form/spare-part-form.component';
import { MarkListComponent } from './mark-list/mark-list.component';
import { SparePartListComponent } from './sparepart-list/sparepart-list.component';

/*const routes:Routes = [
    {path:'', component: LoginComponent},
    {path:'register', component: RegisterComponent}
  ];*/

const roots: Routes = [
  {
    path: '',
    component: MainPageComponent, children: [
      { path: 'marklist', component: MarkListComponent },
      { path: 'markedit', component: MarkFormComponent },
      { path: 'markedit/:id', component: MarkFormComponent },
      { path: 'sparepartlist', component: SparePartListComponent },
      { path: 'sparepartedit', component: SparePartFormComponent },
      { path: 'sparepartedit/:id', component: SparePartFormComponent }
    ]
  }
];

const crisisCenterRoutes: Routes = [
  {
    path: 'crisis-center',
    component: MainPageComponent,
    children: [
      {
        path: '',
        component: MainPageComponent
      }
    ]
  }
];

@NgModule({
  declarations: [MarkFormComponent, MainPageComponent, SparePartFormComponent, MarkListComponent, SparePartListComponent],
  imports: [FormsModule, CommonModule, RouterModule.forChild(roots)],
  exports: [MarkFormComponent, MainPageComponent],
  providers: [],
  bootstrap: [MainPageComponent]
})
export class AdminModule { }
