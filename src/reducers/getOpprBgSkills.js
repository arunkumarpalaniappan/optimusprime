import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function opportunitiesSkillsReducer(state = initialState.opprbgskills, action) {  
  switch(action.type) {
    case types.LOAD_SKILLSBG_SUCCESS:
      return action.opprbgskills;
    default: 
      return state;
  }
}