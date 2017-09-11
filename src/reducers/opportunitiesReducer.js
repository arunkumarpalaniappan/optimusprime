import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function opportunitiesReducer(state = initialState.oppr, action) {  
  switch(action.type) {
    case types.LOAD_OPPR_SUCCESS:
      return action.oppr;
    default: 
      return state;
  }
}