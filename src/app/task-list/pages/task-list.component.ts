import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../services/task-list.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators, } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  SearchText="";
  filterState="";
  filterDate ="" ;
  filterFinishDate ="" ;
  userId = localStorage.getItem('userId');
  currentPage: number = 1;
  lastPage: number = 1;

  showModal: boolean = false;
  isEditing: boolean = false;
  taskForm: FormGroup;
  editingTaskId: any;

  constructor(private taskListService: TaskListService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      status: [0, Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(page: number = 1) {
    let user = {
      user_id: this.userId,
      keyWordInput: this.SearchText,
      status: this.filterState,
      date: this.filterDate,
      finishDate: this.filterFinishDate,
      page: page
    };

    this.taskListService.getTasks(user).subscribe({
      next: (data: any) => {
        if (data['status']) {
          this.tasks = data['data']['data'];
          this.currentPage = data['data']['current_page'];
          this.lastPage = data['data']['last_page'];
        }
      },
      error: (err) => {
        console.error('Error al obtener tareas:', err);
      },
    });
  }

  cleanFilters(){
    this.SearchText = '';
    this.filterState = '';
    this.filterDate = '';
    this.filterFinishDate = '';

    this.getTasks();
  }

  getStatusClass(status: number) {
    switch (status) {
      case 0:
        return 'bg-gray-500 text-white';
      case 1:
        return 'bg-blue-500 text-white';
      case 2:
        return 'bg-green-500 text-white';
      case 3:
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-300 text-black';
    }
  }

  getStatusText(status: number): string {
    switch (status) {
      case 0:
        return 'Sin iniciar';
      case 1:
        return 'En proceso';
      case 2:
        return 'Completada';
      case 3:
        return 'Anulada';
      default:
        return 'Desconocido';
    }
  }

  getDisableButtons(){
    if (this.SearchText == "" && this.filterState == "" && this.filterDate == "" && this.filterFinishDate == "" ) {
      return true;
    }
    return false;
  }

  changePage(page: number) {
    if (page > 0 && page <= this.lastPage) {
      this.getTasks(page);
    }
  }

  openModal(task: any = null) {
    this.isEditing = !!task;
    this.editingTaskId = task ? task.id : null;
    this.taskForm.setValue({
      name: task ? task.name : '',
      description: task ? task.description : '',
      status: task ? task.status : 0,
      date: task ? this.formatDate(task.date) : ''
    });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveTask() {

    if (this.taskForm.valid) {
      let task = {
        user_id: this.userId,
        id: this.editingTaskId,
        name: this.formControls.name.value,
        description: this.formControls.description.value,
        status: this.formControls.status.value,
        date: this.formControls.date.value
      }
      this.taskListService.saveOrUpdateTask(task).subscribe({
        next: (data:any) => {
          if (data['status']) {
            const message = this.isEditing ? 'Tarea actualizada correctamente' : 'Tarea creada correctamente';
            this.showSuccessAlert(message);
            this.closeModal();
            this.SearchText = '';
            this.getTasks();
          }
        }
      })
    }
  }

  deleteTask(taskId:number){
    let task = {
      userId: this.userId,
      taskId:taskId
    }
    this.taskListService.deleteTask(task).subscribe({
      next: (data:any) => {
        if (data['status']) {
          this.showSuccessAlert('Tarea eliminada con exito');
          this.getTasks();
        }
      }
    })
  }

  showSuccessAlert(message: string) {
    Swal.fire({
      title: '¡Éxito!',
      text: message,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  }

  showDeleteAlert(taskId: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteTask(taskId);
      }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    
    return dateString.split(' ')[0];
  }

  get formControls(): any {
    return this.taskForm.controls;
  }
  

}
