import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ConocenosComponent } from './components/conocenos/conocenos.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';

export const ROUTES: Routes = [

    {
        path: '' , component: HomeComponent
    },
    {
        path: 'home' , component: HomeComponent 
    },
    {
        path: 'conocenos' , component: ConocenosComponent 
    },
    {
        path: 'login' , component: LoginComponent 
    },
    {
        path: 'register' , component: RegisterComponent 
    },
    {
        path: '**' , component: ErrorComponent 
    }

];