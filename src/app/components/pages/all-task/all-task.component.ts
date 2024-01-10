import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { StateService } from '../../../services/state.service';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule, DatePipe, PageTitleComponent,TaskListComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss',
})
export class AllTaskComponent {
  newTask = '';
  initalTaskList:any[]=[]; 
  httpService = inject(HttpService);
  stateService = inject(StateService);
  taskList: any[] = [];
 
  ngOnInit(){
    this.stateService.searchSubject.subscribe((value)=>{
      if(value){
        this.taskList=this.initalTaskList.filter(x=>x.title.toLowerCase().includes(value.toLowerCase()))
      }else{
        this.taskList=this.initalTaskList;
      }
    })
   this.getAllTasks();
  }
  addTask() {
    console.log('addTask', this.newTask);
    this.httpService.addTask(this.newTask).subscribe(() => {
      this.newTask = '';
      this.getAllTasks();
    })
  }
  getAllTasks(){
    this.httpService.getAllTasks().subscribe((result:any)=>{
      this.initalTaskList = this.taskList = result;
    })
  }
  onComplete(task:any){
    task.complete=true;
    console.log("complete",task)
    this.httpService.updateTasks(task).subscribe(()=>{
      this.getAllTasks();
    })
  }
  onImportant(task:any){
    task.important=true;
    this.httpService.updateTasks(task).subscribe(()=>{
    this.getAllTasks();
    })
  }
  search(searchTerm:any){
    console.log(searchTerm)
  }
}
