import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from 'src/components/tasks/tasks.component';

const routes: Routes = [{ path: '', component: TasksComponent }];

@NgModule({
  declarations: [],
  imports: [[RouterModule.forRoot(routes)], CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
