import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function opportunitiesReducer(state = initialState.opprskills, action) {  
  switch(action.type) {
    case types.LOAD_SKILLS_SUCCESS:
      return action.opprskills;
    default: 
      return state;
  }
}