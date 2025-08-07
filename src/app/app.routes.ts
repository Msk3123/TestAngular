import { Routes } from '@angular/router';
import { RegistrationComponent } from '../component/registration.component';
import { PlaygroundComponent } from "../game/PlaygroundComponent";

export const routes: Routes = [
    { path: '', redirectTo: '/registration', pathMatch: 'full' },
    { path: 'registration', component: RegistrationComponent },
    { path: 'game', component: PlaygroundComponent }
];