import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';


// children routes
import { HomeComponent } from '../components/';
// import { HomeComponent, LoginComponent } from '../components/';
import { Route } from '@angular/router/src/config';

import { menuRoutes } from './church-routing';

let mainRoutes: Routes = [];

mainRoutes = [
//     { path: '', redirectTo: 'login', pathMatch: 'full' },
//     { path: 'login', component: LoginComponent},
    { path: 'main', component: HomeComponent, children: menuRoutes }
];

console.log(JSON.stringify(mainRoutes));

@NgModule({
    imports: [RouterModule.forRoot(mainRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
