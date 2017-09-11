import {HOST} from '../config.js';

class opportunitiesApi {  
    static getOpportunities(page) {
      return fetch(HOST + '/opportunities?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c&page='+page, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
    }).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }
    static getOpportunity(id) {
      return fetch(HOST + '/opportunities/'+id+'?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
    }).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }
    static getOpportunitiesBackGround() {
        return fetch(HOST + '/lists/backgrounds?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c', {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
      }).then(response => {
          return response.json();
        }).catch(error => {
          return error;
        });
      }
      static getOpportunitiesSkills() {
        return fetch(HOST + '/lists/skills?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c', {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
      }).then(response => {
          return response.json();
        }).catch(error => {
          return error;
        });
      }
    static setOpportunities(id,updatedJSON) {
        return fetch(HOST + '/opportunities/'+id+'?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(updatedJSON)
        }).then(response => {
          return response.json();
        }).catch(error => {
          return error;
        });
      }
      static getGooglePlaces(locString) {
        return fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+locString+'&types=geocode&key=AIzaSyAASN-WrRCKRbQeyMNX6hwhKIqGK5-KeMM', {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
      }).then(response => {
          return response.json();
        }).catch(error => {
          return error;
        });
      }
}
  
export default opportunitiesApi; 