import {USERS_POSTS_STATE_CHANGE, USERS_DATA_STATE_CHANGE} from '../constants';

const initialState = {
  users: [],
  feed:[],
  usersLoaded: 0,
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
      };
    default:
      return state;
  }
};
