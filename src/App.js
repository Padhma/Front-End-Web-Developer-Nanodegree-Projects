import React, { Component } from 'react';
import './App.css';
import { GoogleApiWrapper } from 'google-maps-react';
import * as utils from './utilities'
import ListDrawer from './SearchBar'
import NoMapDisplay from './ErrorHandler'
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venue: ''
    }
  }

  //styles for the hamburger icon
  styles = {
     menuButton: {
      marginLeft: 10,
      marginRight: 20,
      position: "absolute",
      left: 10,
      top: 20,
      width: "45px",
      background: "white",
      padding: 10
    },
    hide: {
      display: 'none'
    },
    header: {
      marginTop: "0px"
    }
  };

  //toggle the hamburger icon
  toggleList = () => {
    this.setState({
      open: !this.state.open
    });
  }

  componentDidMount() {
    let mapsPromise = utils.load_google_maps();
    let locationsPromise = utils.load_locations();

    Promise.all([
      mapsPromise,
      locationsPromise
    ])
    .then(values => {
      let google = values[0];
      this.venues = values[1].response.venues;

      this.google = google;
      this.markers = [];
      this.infowindow = new google.maps.InfoWindow();
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        scrollwheel: true,
        center: { lat: this.venues[0].location.lat, lng: this.venues[0].location.lng }
      });

      this.venues.forEach(venue => {
        let marker = new google.maps.Marker({
        position: { lat: venue.location.lat, lng: venue.location.lng },
        map: this.map,
        venue: venue,
        id: venue.id,
        name: venue.name,
        animation: google.maps.Animation.DROP
      });

      let info_boxes = [];
      //display info about the location when the marker is clicked
      //using foursquare
      let informationModal = '<div class="info_box">' +
        '<h4>' + venue.name + '</h4>' +
        '<p>' + utils.concatenate(venue.location.formattedAddress) + '</p>' +
        '<p>' + venue.hereNow.summary + '</p>' +
        '<img class="infoimage" alt="' + venue.name + '" src="' + utils.getImage(venue) + '" />' +
        '</div>';

      //add animations to the markers
      marker.addListener('click', () => {
          if (marker.getAnimation() !== null) { marker.setAnimation(null); }
          else { marker.setAnimation(google.maps.Animation.BOUNCE); }
          setTimeout(() => { marker.setAnimation(null) }, 1300);
        });
        google.maps.event.addListener(marker, 'click', () => {
          this.infowindow.setContent(informationModal);
          this.map.setZoom(11);
          this.map.setCenter(marker.position);
          this.infowindow.open(this.map, marker);
          this.map.panBy(0, -120);
      });

      this.markers.push(marker);
      info_boxes.push({ id: venue.id, name: venue.name, contents: informationModal });
    });

    this.setState({ filterVenues: this.venues });
    })
  }

  //filter locations as the user types in
  filterLocations = (venue) => {
    let item = this.venues.filter(obj => obj.name.toLowerCase().includes(venue.toLowerCase()));
    this.markers.forEach(marker => {
      marker.name.toLowerCase().includes(venue.toLowerCase()) === true ?
      marker.setVisible(true) : marker.setVisible(false);
    });
    this.setState({ filterVenues: item, venue });
  }

  itemClick = (query) => {
    let marker = this.markers.filter(t => t.id === query.id)[0];
     this.infowindow.setContent(marker.name);
     this.map.setZoom(11);
     this.map.setCenter(marker.position);
     this.infowindow.open(this.map, marker);
     this.map.panBy(0, -120);
     //console.log(marker);
     if (marker.getAnimation() !== null) { marker.setAnimation(null); }
     else { marker.setAnimation(this.google.maps.Animation.BOUNCE); }
     setTimeout(() => { marker.setAnimation(null) }, 1300);
  }

  render() {
    return (
      <div className="app">
      <div className="nav">
       <button onClick={this.toggleList} style={this.styles.menuButton}>
            <i className="fa fa-bars"></i>
          </button>
          <h1>Shopping Malls in Bangalore</h1>
      </div>
      <div id="map" role="application" aria-label="map">

      </div>
      <ListDrawer
      open = {this.state.open}
      toggleDrawer = {this.toggleList}
      itemClick={this.itemClick}
      filterVenues={this.state.filterVenues}
      filterLocations={this.filterLocations}
      />
      </div>
    );
  }
}

export default GoogleApiWrapper({LoadingContainer: NoMapDisplay})(App)