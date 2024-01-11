import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as taskActions from './task.actions';
import { TaskService } from './task.service';

@Injectable()
export class TasksEffects {
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.loadData),
      switchMap(() =>
        this.taskService.getTasks().pipe(
          map((data) => taskActions.loadDataSuccess({ data })),
          catchError((error) => of(taskActions.loadDataError({ error })))
        )
      )
    )
  );

  saveData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.saveData),
      switchMap((action) =>
        this.taskService.saveTask(action.task).pipe(
          mergeMap(() => [
            taskActions.saveDataSuccess(),
            taskActions.loadData(),
          ]),
          catchError((error) => of(taskActions.saveDataError({ error })))
        )
      )
    )
  );

  updateStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.updateStatus),
      switchMap((action) =>
        this.taskService.updateStatusTask(action.taskId, action.status).pipe(
          mergeMap(() => [
            taskActions.updateStatusSuccess(),
            taskActions.loadData(),
          ]),
          catchError((error) => of(taskActions.updateStatusError({ error })))
        )
      )
    )
  );

  getTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.getTask),
      switchMap((action) =>
        this.taskService.getTask(action.taskId).pipe(
          mergeMap((task) => [taskActions.getTaskSuccess({ task })]),
          catchError((error) => of(taskActions.getTaskError({ error })))
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.updateTask),
      switchMap((action) =>
        this.taskService.updateTask(action.task).pipe(
          mergeMap(() => [
            taskActions.updateTaskSuccess(),
            taskActions.loadData(),
          ]),
          catchError((error) => of(taskActions.updateTaskError({ error })))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.deleteTask),
      switchMap((action) =>
        this.taskService.deletTask(action.taskId).pipe(
          mergeMap(() => [
            taskActions.deleteTaskSuccess(),
            taskActions.loadData(),
          ]),
          catchError((error) => of(taskActions.deleteTaskError({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private taskService: TaskService) {}
}
