import React, { Component } from 'react'

import configData from '../../config.json'
import axios from 'axios'
import './SeatSelection.scss'

export class SeatSelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          totalSeatCount: 60,
          events: []
        };
      }

      componentDidMount() {
            
      }

    fetchEvents = (val) => {
        // axios.get(configData.SERVER_URL + '/events/' + val)
        // .then((res) => {
        //     this.setState({events: res.data});
        //   });
      }
      
      render() {
        

        return (
            <div className="seat__selection">
                <p>Seat Selection</p>
            </div>
        )
    }
}

export default SeatSelection
