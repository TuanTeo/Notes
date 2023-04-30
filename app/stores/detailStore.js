import React from 'react';
import {makeAutoObservable} from 'mobx';

class DetailStore {
  task = {};
  details = {}

  constructor() {
    makeAutoObservable(this);
  }

  setTaskId = taskId => {
    this.task = {...this.task, task_id: taskId};
  };

  setDetails = data => {
    this.details = {...this.details, data: data};
  }
}

// Instantiate the counter store.
const detailStore = new DetailStore();
// Create a React Context with the counter store instance.
export const DetailStoreContext = React.createContext(detailStore);
export const useDetailStore = () => React.useContext(DetailStoreContext);