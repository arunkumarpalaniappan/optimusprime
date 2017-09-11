import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function getOpportunityReducer(state = initialState.opprinfo, action) {  
  switch(action.type) {
    case types.LOAD_OPPRID_SUCCESS:
      return action.opprinfo;
    default: 
      return state;
  }
}