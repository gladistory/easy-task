import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { UpdateComponent } from './components/update/update.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
    {path: 'easy', component: TasksComponent, canActivate: [AuthGuard]},
    {path: '', component: TasksComponent, canActivate: [AuthGuard]},
    {path: 'update/:id', component: UpdateComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
];