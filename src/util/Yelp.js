//Credentials
const clientId = 'JGjgTMI_nUHAI9OQr_9Kcw';
const secret = 'G5Jkn08tAjIVScgab9LBrLi06jt88MKUMg6KYMvB46HDGm6KDDxAVnxkujZoHmhM';
let accessToken;

const Yelp = {
  getAccessToken() {
    if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
    } return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`,
      {
        method: 'POST'
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        return accessToken = jsonResponse.access_token;
      })
  },

  search(term,location,sortBy) {
    return this.getAccessToken().then( () => {
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=$sortBy`, {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map(business => {
            return {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories.title,
            rating: business.rating,
            reviewCount: business.review_count
          }
          })
        }
      })
    })
  }

}


export default Yelp


//,headers: {"Content-type": "application/x-www-form-urlencoded"} --According to Yelp API documentation should be sent in this format, is this correct?