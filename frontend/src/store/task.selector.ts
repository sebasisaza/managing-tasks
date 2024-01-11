import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const taskState = createFeatureSelector<TaskState>('tasks');

export const getIsLoading = createSelector(
  taskState,
  (state: TaskState) => state.isLoading
);

export const getData = createSelector(
  taskState,
  (state: TaskState) => state.data
);

export const getTask = createSelector(
  taskState,
  (state: TaskState) => state?.selectedTask
);
