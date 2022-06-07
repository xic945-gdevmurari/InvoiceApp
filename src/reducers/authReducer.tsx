import {USER_DATA} from '../actions/types';

const INITIAL_STATE = {
  allUserData: [],
};

export default (state = INITIAL_STATE, action:any) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        allUserData: [...state.allUserData, ...action?.payload],
      };
    default:
      return state;
  }
};
