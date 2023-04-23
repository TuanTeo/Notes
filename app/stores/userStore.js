import React from 'react';
import {makeObservable, action, observable, makeAutoObservable} from 'mobx';

class UserStore {
  user = {};

  constructor() {
    makeAutoObservable(this);
  }

  setUser = id => {
    this.user = {...this.user, user_id: id};
  };
}

// Instantiate the counter store.
const userStore = new UserStore();
// Create a React Context with the counter store instance.
export const UserStoreContext = React.createContext(userStore);
export const useUserStore = () => React.useContext(UserStoreContext);
