import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../../../Task';
import { NgToastService, NgToastModule } from 'ng-angular-popup';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgToastModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  encapsulation: ViewEncapsulation.None, 
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('700ms ease', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class TasksComponent {
  showForm = false; // Controla a exibição do formulário

  tasks: Task[] = [];
  newTask: Task = {title: '', description: '', time: '', status: ''}

  constructor(private taskService: TasksService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  toggleForm() {
    this.showForm = !this.showForm; // Alterna entre mostrar/ocultar
  }

  // Pega todas as tasks
  getAllTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => (this.tasks = data),
      error: (error) => console.error(error),
      complete: () => console.log('Fetch complete'),
    });
  }

  // Add a new task
  addTask(): void {
    if (!this.newTask.title || !this.newTask.description || !this.newTask.time || !this.newTask.status) {
      this.showWarning();
      return;
    }

    this.taskService.createTask(this.newTask).subscribe({
      next: (data) => {
        this.tasks.push(data);
        this.newTask = { title: '', description: '', time: '', status: '' }; // Clear form
      },
      error: (error) => console.error(error),
      complete: () => this.showSuccess(),
    });
    
  }

  // Deletar uma tarefa
  deleteTask(id: number | undefined): void {
    if (id === undefined) {
      console.error('Task ID não definido');
      return;
    }
  
    if (confirm('Deseja realmente deletar essa tarefa?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.showSuccess();
          this.getAllTasks();
        },
        error: (error) => {
          console.error('Error deleting task', error);
        }
      });
    }
  }

showSuccess() {
  this.toast.success('Operação realizada com sucesso!', '', 5000);
  }

  // Aviso
showWarning(): void {
    this.toast.warning('Todos os campos devem ser preenchidos!', '', 5000);
  }



}
