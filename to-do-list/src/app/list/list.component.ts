import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  newTask:string = " ";
  tasks:string[] = [];
  isComplete:boolean=false;

  constructor(){

  }

  addTask(){
    if(this.newTask.trim() !== ""){
      this.tasks.push(this.newTask);
      this.newTask = "";
    }
  }
  completeItem(){
   console.log("holaaa", this.isComplete = !this.isComplete);
  }

}
