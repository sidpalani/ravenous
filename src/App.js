import React from 'react';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList.js';
import SearchBar from './components/SearchBar/SearchBar.js';
import Yelp from './util/Yelp.js';

/* HARDCODED BUSINESSES FROM RAVENOUS PART 3
const business = {
  imageSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
  name: 'MarginOtto Pizzeria',
  address: '1010 Paddington Way',
  city: 'Flavortown',
  state: 'NY',
  zipCode: '10101',
  category: 'Italian',
  rating: 4.5,
  reviewCount: 90
};

const business2 = {
  imageSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
  name: 'Sidhartha Pizzeria',
  address: '130 Nuttall Road',
  city: 'Riverside',
  state: 'IL',
  zipCode: '60546',
  category: 'Indian',
  rating: 5.0,
  reviewCount: 105
};

const businesses = [
  business,
  business2,
  business,
  business,
  business,
  business
];
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {businesses: []};
    this.searchYelp = this.searchYelp.bind(this);
  }
  searchYelp(term,location,sortBy) {
    Yelp.search(term,location,sortBy).then( businesses => {
      this.setState({businesses: businesses});
      });
  }
  render() {
    return (
      <div className="App">
      <h1>ravenous</h1>
      <SearchBar searchYelp={this.searchYelp}/>
      <BusinessList businesses={this.state.businesses}/>
    </div>
    );
  }
}

export default App;
