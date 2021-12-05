import {
  USER_POSTS_STATE_CHANGE,
  USER_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USER_FOLLOWER_STATE_CHANGE,
} from '../constants';

const initialState = {
  currentUser: null,
  posts: [],
  following: [],
  follower: [],
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case USER_POSTS_STATE_CHANGE:
      return {
        ...state,
        posts: action.posts,
      };
    case USER_FOLLOWING_STATE_CHANGE:
      return {
        ...state,
        following: action.following,
      };
    case USER_FOLLOWER_STATE_CHANGE:
      return {
        ...state,
        follower: action.follower,
      };
    default:
      return state;
  }
};
