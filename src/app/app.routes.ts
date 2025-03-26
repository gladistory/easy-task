import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { UpdateComponent } from './components/update/update.component';
import { LoginComponent } from './login/login.component';
export const routes: Routes = [
    {path: 'easy-task', component: TasksComponent},
    {path: '', component: TasksComponent},
    {path: 'update/:id', component: UpdateComponent},
    {path: 'login', component: LoginComponent}
];