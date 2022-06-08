import {USER_DATA, USER_DUMMY_DATA} from '../actions/types';

const INITIAL_STATE = {
  allUserData: {},
  data: [],
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        allUserData: action?.payload,
      };
    case USER_DUMMY_DATA:
      return {
        ...state,
        data: action?.payload,
      };
    default:
      return state;
  }
};
