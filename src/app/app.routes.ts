import { Routes } from '@angular/router';
import { LoginComponent } from './login/pages/login.component';
import { TaskListComponent } from './task-list/pages/task-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
