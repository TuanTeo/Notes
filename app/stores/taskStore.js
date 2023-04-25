import React from 'react';
import {makeAutoObservable} from 'mobx';

class TaskStore {
  task = {};

  constructor() {
    makeAutoObservable(this);
  }

  setTask = data => {
    this.task = {...this.task, data: data};
  };
}

// Instantiate the counter store.
const taskStore = new TaskStore();
// Create a React Context with the counter store instance.
export const TaskStoreContext = React.createContext(taskStore);
export const useTaskStore = () => React.useContext(TaskStoreContext);
