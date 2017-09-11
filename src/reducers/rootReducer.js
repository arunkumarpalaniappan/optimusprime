import {combineReducers} from 'redux';  
import opprbg from './opportunitiesReducer';
import opprinfo from './getOpportunityReducer'
import mapsdata from './googleMapsReducer'
import opprskills from './getOpportunitySkills';
import opprbgskills from './getOpprBgSkills';
import opprupdate from './opprUpdate';

const rootReducer = combineReducers({  
  opprbg,
  opprinfo,
  mapsdata,
  opprskills,
  opprbgskills,
  opprupdate
})

export default rootReducer;  