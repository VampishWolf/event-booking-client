import React, { Component } from 'react'
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

    fetchEvents = (val) => {
        axios.get(configData.SERVER_URL + '/events/' + val)
        .then((res) => {
            this.setState({events: res.data});
          });
      }
      
      render() {
        

        return (
            <div className="eventsection">
                <div className="side__nav">
                    <ul className="side__option">
                    {this.state.genres.map((genre, index) => {
                        return(
                            <li key={genre._id} onClick={(e) => this.fetchEvents(genre.value)} value={genre.value}>{genre.value}</li>
                        )
                    })}
                    </ul>
                </div>
                <div className="event__cards">
                    {this.state.events ? this.state.events.map((event, index) => {
                        return(
                        <div className="event__card" key={event._id}>
                            <img src="#" alt="Events"/>
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
