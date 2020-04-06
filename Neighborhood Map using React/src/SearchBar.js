import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';

class SearchBar extends Component {
  state = {
    open: false,
    input: ""
  }

  //styles for the list view and the filter option
  styles = {
        list: {
            width: "350px",
            height: "auto",
            padding: "0px 15px 0px",
            backgroundColor: "#1C2833"
        },
        noListStyle: {
            listStyleType: "none",
            padding: 0
        },
        fullList: {
            width: 'auto',
            height: "auto"
        },
        listItem: {
            marginBottom: "15px",
            color: "white",
            padding: "10px"
        },
        listLink: {
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: "1rem"
        },
        filterEntry: {
            padding: "10px",
            margin: "30px 0px 10px",
            width: "325px",
            fontSize: "1.2rem",
            borderRadius: "10px"
        }
  };

  componentDidMount() {
  }

  //filter the locations as the user types the query
  //and also updates the marker
  render() {
    return (
      <div>
      <Drawer open={this.props.open} onClose={this.props.toggleDrawer}>
       <div style={this.styles.list}>
        <input style={this.styles.filterEntry} placeholder="Filter Location" value={this.props.venue} onChange={(events) => { this.props.filterLocations(events.target.value) }} />
        <ul style={this.styles.noListStyle}>
        {
          this.props.filterVenues && this.props.filterVenues.length > 0 && this.props.filterVenues.map((query, index) => (
            <div key = {index} className = "venue-item" onClick = {() => { this.props.itemClick(query) }}>
              {query.name}
            </div>
            ))
        }
        </ul>
        </div>
        </Drawer>
      </div>
    );
  }
}

export default SearchBar;
