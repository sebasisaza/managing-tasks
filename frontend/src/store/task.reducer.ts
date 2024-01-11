import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/models/task.model';
import * as taskActions from './task.actions';

export interface TaskState {
  data: Task[];
  isLoading: boolean;
  error: string;
  selectedTask?: Task;
}

export const initialState: TaskState = {
  data: [],
  isLoading: false,
  error: '',
};

export const taskReducer = createReducer(
  initialState,
  on(taskActions.loadData, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(taskActions.loadDataSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    data,
  })),
  on(taskActions.getTaskSuccess, (state, { task }) => ({
    ...state,
    selectedTask: task,
  })),
  on(
    taskActions.loadDataError,
    taskActions.saveDataError,
    taskActions.updateStatusError,
    taskActions.getTaskError,
    taskActions.updateTaskError,
    taskActions.deleteTaskError,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })
  )
);
