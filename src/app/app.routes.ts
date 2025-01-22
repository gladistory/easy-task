import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { UpdateComponent } from './components/update/update.component';
export const routes: Routes = [
    {path: 'easy-task', component: TasksComponent},
    {path: '', component: TasksComponent},
    {path: 'update/:id', component: UpdateComponent}
];