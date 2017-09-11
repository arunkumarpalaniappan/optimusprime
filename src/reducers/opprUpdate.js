import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function opportunitiesReducer(state = initialState.opprupdate, action) {  
  switch(action.type) {
    case types.UPDATE_OPPR_SUCCESS:
      return action.opprupdate;
    default: 
      return state;
  }
}