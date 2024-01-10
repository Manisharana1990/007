import { Component, inject } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';

@Component({
  selector: 'app-important-tasks',
  standalone: true,
  imports: [PageTitleComponent, TaskListComponent],
  templateUrl: './important-tasks.component.html',
  styleUrl: './important-tasks.component.scss'
})
export class ImportantTasksComponent {
  newTask = '';
  taskList:any[]=[];
 
  httpService = inject(HttpService);
  ngOnInit(){
    this.getAllTasks();
  }
   getAllTasks(){
    this.httpService.getAllTasks().subscribe((result:any)=>{
      this.taskList=result.filter((x:any)=>x.important==true);
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
}
