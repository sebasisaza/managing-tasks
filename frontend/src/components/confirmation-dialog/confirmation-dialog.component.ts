import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TaskState } from 'src/store/task.reducer';
import * as taskActions from '../../store/task.actions';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  constructor(
    private store: Store<TaskState>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.store.dispatch(taskActions.deleteTask({ taskId: this.data.taskId }));
    this._onCloseDialog();
  }

  onCanel(): void {
    this._onCloseDialog();
  }

  private _onCloseDialog(): void {
    this.dialog.closeAll();
  }
}
