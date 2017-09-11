import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function getGoogleMapsReducer(state = initialState.mapsdata, action) {  
    switch(action.type) {
      case types.LOAD_MAPS_SUCCESS:
        return action.mapsdata;
      default: 
        return state;
    }
  }