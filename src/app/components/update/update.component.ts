import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../../../Task';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-update',
  imports: [CommonModule, FormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {

  task: Task = { id: undefined, title: '', description: '', time: '', status: '' };

  constructor(
     private taskService: TasksService,
     private router:Router,
     private route:ActivatedRoute,
     private toast: NgToastService
    ) {}

  ngOnInit(): void {
    this.loadTask();
  }

  // Carregar os dados da tarefa pelo ID
  loadTask(): void {
    const id = Number (this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.taskService.getTaskById(Number(id)).subscribe({
        next: (data) => (this.task = data),
        error: (err) => console.error('Error loading task:', err),
      });
    }
  }

  
  updateTask(): void {
    if (!this.task.id) {
      console.error('Task ID is undefined');
      return;
    }
  
    this.taskService.updateTask(this.task.id, this.task).subscribe({
      next: () => {
        this.showSuccess();
        this.router.navigate(['/tasks']); // Redirecionar após o update
      },
      error: (err) => this.showWarning(),
    });
  }

  showSuccess() {
    this.toast.success('Operação realizada com sucesso!');
    }
  
    // Aviso
  showWarning(): void {
      this.toast.warning('Todos os campos devem ser preenchidos!');
    }

}
