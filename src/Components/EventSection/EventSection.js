import React, { Component } from 'react'
// import { Link, Redirect, NavLink } from 'react-router-dom'
import configData from '../../config.json'
import axios from 'axios'
import './EventSection.scss'

export class EventSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          genres: [],
          events: []
        };
      }

      componentDidMount() {
          axios.get(configData.SERVER_URL + '/genres')
          .then((res) => {
              this.setState({genres: res.data});
            });
          axios.get(configData.SERVER_URL + '/events')
          .then((res) => {
              this.setState({events: res.data});
            });
            
      }

    fetchEventsByGenre = (val) => {
        axios.get(configData.SERVER_URL + '/events/' + val)
        .then((res) => {
            this.setState({events: res.data});
          });
      }
      
    seatSelectionRoute = (val) => {
        window.location = window.location + 'events/' + val._id;
    }  
    
    render() {
        return (
            <div className="event__section">
                <div className="side__nav">
                    <ul className="side__option">
                    {this.state.genres.map((genre, index) => {
                        return(
                            <li key={genre._id} onClick={(e) => this.fetchEventsByGenre(genre.value)} value={genre.value}>{genre.value}</li>
                        )
                    })}
                    </ul>
                </div>
                <div className="event__cards">
                    {this.state.events ? this.state.events.map((event, index) => {
                        return( 
                        <div className="event__card" key={event._id} onClick={
                            (e) => this.seatSelectionRoute(event)
                            // <Link to={`events/${event._id}`} activeClassName="active" />
                        }>
                            <img src={event.eimage} alt="Events" className="event__card__image"/>
                            <h6>{event.title}</h6>
                            <p>{event.description}</p>
                        </div>
                        )
                    })
                    : <h5>No events found!</h5>
                }
                </div>
            </div>
        )
    }
}

export default EventSection
