import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserformComponent } from './userform/userform.component';

const routes: Routes = [{path:'users', component:UserformComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
