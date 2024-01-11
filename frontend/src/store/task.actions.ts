import { createAction, props } from '@ngrx/store';
import { Task } from 'src/models/task.model';

const prefix = '[Tasks]';

export const loadData = createAction(`${prefix} Load Data`);

export const loadDataSuccess = createAction(
  `${prefix} Load Data Success`,
  props<{ data: Task[] }>()
);

export const loadDataError = createAction(
  `${prefix} Load Data Error`,
  props<{ error: string }>()
);

export const saveData = createAction(
  `${prefix} Save Data`,
  props<{ task: Task }>()
);

export const saveDataSuccess = createAction(`${prefix} Save Data Success`);

export const saveDataError = createAction(
  `${prefix} Save Data Error`,
  props<{ error: string }>()
);

export const updateStatus = createAction(
  `${prefix} Update Status`,
  props<{ taskId: number; status: boolean }>()
);

export const updateStatusSuccess = createAction(
  `${prefix} Update Status Success`
);

export const updateStatusError = createAction(
  `${prefix} Update Status Error`,
  props<{ error: string }>()
);

export const getTask = createAction(
  `${prefix} Get Task`,
  props<{ taskId: number }>()
);

export const getTaskSuccess = createAction(
  `${prefix} Get Task Success`,
  props<{ task: Task }>()
);

export const getTaskError = createAction(
  `${prefix} Get Task Error`,
  props<{ error: string }>()
);

export const updateTask = createAction(
  `${prefix} Update Task`,
  props<{ task: Task }>()
);

export const updateTaskSuccess = createAction(`${prefix} Update Task Success`);

export const updateTaskError = createAction(
  `${prefix} Update Task Error`,
  props<{ error: string }>()
);

export const deleteTask = createAction(
  `${prefix} Delete Task`,
  props<{ taskId: number }>()
);

export const deleteTaskSuccess = createAction(`${prefix} Delete Task Success`);

export const deleteTaskError = createAction(
  `${prefix} Delete Task Error`,
  props<{ error: string }>()
);
