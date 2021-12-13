import {USERS_POSTS_STATE_CHANGE, USERS_DATA_STATE_CHANGE, CLEAR_DATA} from '../constants';

const initialState = {
  users: [],
  feed: [],
  usersLoaded: 0,
  feedLoaded: false
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case USERS_DATA_STATE_CHANGE:
      return {
        ...state,
        users: [...state.users, action.user],
      };
    case USERS_POSTS_STATE_CHANGE:
      return {
        ...state,
        usersLoaded: state.usersLoaded + 1,
        feed: [...state.feed, ...action.posts],
        feedLoaded: true,
      };
    case CLEAR_DATA:
      console.log('clear data')
      return {
        users: [],
        feed: [],
        usersLoaded: 0,
        feedLoaded: false
      };
    default:
      return state;
  }
};
