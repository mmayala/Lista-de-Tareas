import { Component, OnInit } from '@angular/core';
import { Task } from '../interfaz/task.interface';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

formTask: FormGroup;
tasks:Task[] = [];
currentId = 1;
messageError:string = 'La lista de tareas esta vacía';

  constructor(private fb:FormBuilder) {
    this.formTask = this.fb.group({
      newTask:['', Validators.required]
    });
    
    
  }

  ngOnInit(): void {
    this.getTasksLocalStorage();
  }

addTask() {
  if(this.formTask.invalid){
    return;
  };

  const newTask:Task = {
    id:this.currentId++,
    name:this.formTask.value.newTask,
    completed:false
  };
  this.tasks.push(newTask);
  this.saveLocalStorage();
  this.formTask.reset();
  }

  get newTask(){
    return this.formTask.get('newTask');
  }

completeItem(task:Task){
  task.completed = !task.completed;
  this.saveLocalStorage();
  }

saveLocalStorage(){
  localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

getTasksLocalStorage() {
    const dataLocal= localStorage.getItem('tasks');
    console.log('vaya esta muy bien', dataLocal);
    if(dataLocal){
      this.tasks=JSON.parse(dataLocal)
      this.currentId = this.tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
    }
  }

deletetTask(id:number){
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveLocalStorage();
  }

updateTasksPending():string {
    const completedCount = this.tasks.filter(task => task.completed).length;
    const totalCount = this.tasks.length;
    return `${completedCount} de ${totalCount} tarea(s) completada(s)`
}

listTaskEmpty(): boolean{
  return this.tasks.length === 0;
  }
}

