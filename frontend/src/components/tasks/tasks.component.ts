import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/models/task.model';
import { TaskState } from 'src/store/task.reducer';
import * as taskActions from '../../store/task.actions';
import * as taskSelectors from '../../store/task.selector';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CreateTaskComponent } from '../create-task/create-task.compoent';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  isLoading$: Observable<boolean> = new Observable<boolean>();
  tasks$: Observable<Task[]> = new Observable<Task[]>();

  constructor(private store: Store<TaskState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(taskActions.loadData());

    this.tasks$ = this.store.select(taskSelectors.getData);
    this.isLoading$ = this.store.select(taskSelectors.getIsLoading);
  }

  onOpenModal(): void {
    this._openDialog(true);
  }

  onUpdateSatus(taskId: number, status: boolean): void {
    this.store.dispatch(taskActions.updateStatus({ taskId, status: !status }));
  }

  onEditTask(taskId: number): void {
    this.store.dispatch(taskActions.getTask({ taskId }));
    this._openDialog(false, taskId);
  }

  onDeleteTask(taskId: number): void {
    this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      height: '200px',
      width: '200px',
      data: {
        taskId,
      },
    });
  }

  private _openDialog(isAdding: boolean, taskId?: number): void {
    this.dialog.open(CreateTaskComponent, {
      disableClose: true,
      height: '350px',
      width: '400px',
      data: {
        isAdding,
        taskId,
      },
    });
  }
}
