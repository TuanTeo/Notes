import React from 'react';
import {makeAutoObservable} from 'mobx';
import {logUtils} from "../utils/logUtils";

class TaskStore {
  task = {};
  archivedTask = {}
  deletedTask = {}
  createTask = {}

  constructor() {
    makeAutoObservable(this);
  }

  setTask = data => {
    const normal = []
    const archived = []
    const deleted = []

    data.map(item => {
      logUtils('item', item)
      if (item.is_archived === 1) {
        archived.push(item)
      } else if (item.is_deleted === 1) {
        deleted.push(item)
      } else {
        normal.push(item)
      }
    })

    this.task = {...this.task, data: normal};
    this.archivedTask = {...this.archivedTask, data: archived};
    this.deletedTask = {...this.deletedTask, data: deleted};
  };

  setCreateTaskId = createTaskId => {
    this.createTask = {...this.createTask, task_id: createTaskId};
  }

  setTitle = text => {
    this.createTask = {...this.createTask, title: text};
  }
}

// Instantiate the counter store.
const taskStore = new TaskStore();
// Create a React Context with the counter store instance.
export const TaskStoreContext = React.createContext(taskStore);
export const useTaskStore = () => React.useContext(TaskStoreContext);
