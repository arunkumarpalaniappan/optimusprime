class googleMapsApi {  
    static getGooglePlaces(locString) {
      return fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+locString+'&types=geocode&key=AIzaSyAASN-WrRCKRbQeyMNX6hwhKIqGK5-KeMM', {
        method: 'GET',
        mode: 'cors' ,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials': true
          }
    }).then(response => {
      return response.json()
      })
      .catch(error => {
        return error;
      });
    }
}


export default googleMapsApi; 