import * as types from './actionTypes'; 
import opportunitiesApi from '../api/opportunitiesApi';
import googlePlacesApi from '../api/googleMapsApi';

export function loadOpportunities(page) {  
  return function(dispatch) {
    return opportunitiesApi.getOpportunities(page).then(opportunities => {
      dispatch(getOpportunitiesSuccess(opportunities));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOpportunity(id) {  
  return function(dispatch) {
    return opportunitiesApi.getOpportunity(id).then(opportunity => {
      dispatch(getOpportunitySuccess(opportunity));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOpportunitiesBackGround() {  
  return function(dispatch) {
    return opportunitiesApi.getOpportunitiesBackGround().then(opportunities => {
      dispatch(getOpportunitiesBackGroundSuccess(opportunities));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOpportunitiesSkills() {  
  return function(dispatch) {
    return opportunitiesApi.getOpportunitiesSkills().then(opportunities => {
      dispatch(getOpportunitiesSkillsSuccess(opportunities));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateOpportunities(id,updatedJSON) {  
  return function(dispatch) {
    return opportunitiesApi.setOpportunities(id,updatedJSON).then(opportunity => {
      dispatch(setOpportunitiesSuccess(opportunity));
    }).catch(error => {
      throw(error);
    });
  };
}


export function loadGooglePlaces(location) {  
  return function(dispatch) {
    return googlePlacesApi.getGooglePlaces(location).then(places => {
      dispatch(getGooglePlacesSuccess(places));
    }).catch(error => {
      throw(error);
    });
  };
}


export function getOpportunitiesSuccess(oppr) {  
  return {type: types.LOAD_OPPR_SUCCESS, oppr};
}

export function getOpportunitySuccess(opprinfo) {  
  return {type: types.LOAD_OPPRID_SUCCESS, opprinfo};
}

export function getOpportunitiesBackGroundSuccess(opprskills) {  
  return {type: types.LOAD_SKILLS_SUCCESS, opprskills};
}

export function getOpportunitiesSkillsSuccess(opprbgskills) {  
  return {type: types.LOAD_SKILLSBG_SUCCESS, opprbgskills};
}

export function setOpportunitiesSuccess(opprupdate) {  
  return {type: types.UPDATE_OPPR_SUCCESS, opprupdate};
}

export function getGooglePlacesSuccess(mapsdata) {  
  return {type: types.LOAD_MAPS_SUCCESS, mapsdata};
}