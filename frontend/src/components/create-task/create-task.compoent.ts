import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Task } from 'src/models/task.model';
import { TaskState } from 'src/store/task.reducer';
import * as taskActions from '../../store/task.actions';
import * as taskSelectors from '../../store/task.selector';

@Component({
  selector: 'create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    status: new FormControl(false),
  });

  isAdding = true;

  constructor(
    private store: Store<TaskState>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.isAdding = this.data.isAdding;

    if (!this.isAdding) {
      this.store.select(taskSelectors.getTask).subscribe((data) => {
        this.taskForm.controls['title'].setValue(data?.title);
        this.taskForm.controls['status'].setValue(!!data?.status);
      });
    }
  }

  onAddTask(isAdding: boolean): void {
    if (!this.taskForm.valid) {
      return;
    }

    const title = this.taskForm.controls['title'].value;
    const status = !!this.taskForm.controls['status'].value;

    const task: Task = {
      taskId: this.data.taskId,
      title,
      status,
    };

    if (isAdding) {
      this.store.dispatch(taskActions.saveData({ task }));
      this._onCloseDialog();
      return;
    }

    this.store.dispatch(taskActions.updateTask({ task }));
    this._onCloseDialog();
  }

  onCancel(): void {
    this._onCloseDialog();
  }

  private _onCloseDialog(): void {
    this.dialog.closeAll();
  }
}
