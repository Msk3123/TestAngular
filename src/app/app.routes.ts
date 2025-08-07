import { Routes } from '@angular/router'
import { RegistrationComponent } from '../component/registration.component'

export const routes: Routes = [
    { path: '', redirectTo: '/registration', pathMatch: 'full' },
    { path: 'registration', component: RegistrationComponent }
];