import React, { Component } from 'react'
import socketClient  from "socket.io-client";
// import { useParams } from 'react-router-dom';
import configData from '../../config.json'
import axios from 'axios'
// import { subscribeToTimer } from '../../api';
import './SeatSelection.scss'

export class SeatSelection extends Component {

    constructor(props) {
        super(props);
        // subscribeToTimer((err, timestamp) => this.setState({ 
        //     timestamp 
        //   }));
        this.state = {
          error: null,
          isLoaded: false,
          timestamp: 'no timestamp yet',
          totalSeatCount: 60,
          eventDetails: [],
          seatsAvailable: [],
          selectedSeats: [],
          userDetails: {
              name: "",
              email: "",
              mobile: ""
          },

          rows: 2,
          cols: 20,
          availability: 0,
          seatavailableColor: {color:'#72FF72'},
          seatselectedColor: {color:'grey'}
          
        };
      }

      componentDidMount() {
            var socket = socketClient(configData.SERVER_URL);

            // const { pathParam } = this.props.match.params.eventId;
            const { match: { params } } = this.props;
            this.fetchEventDetails(params.eventId);
            console.log(params.eventId);
        }
        
        fetchEventDetails = (val) => {
          axios.get(configData.SERVER_URL + '/selectedEvent/' + val)
          .then((res) => {
              this.setState({eventDetails: res.data});
              console.log(this.state.eventDetails);
            });

        // axios.get(configData.SERVER_URL + '/seats/' + val)
        // .then((res) => {
        //     this.setState({seatsAvailable: res.data});
        //     console.log(res.data);
        //   });
      }
      
      createBooking (val) {
          console.log(this.state.rows);
        }


        selectedSeat(val, index) {
            const selected = val + index.toString();
            console.log(selected);
          //   this.setState({availability:1});
            console.log(this.state.selectedSeats.indexOf(selected) > -1);
            this.state.selectedSeats.indexOf(selected) > -1
            ? this.state.selectedSeats.splice(index, 1)
          //   ? this.state.selectedSeats.filter(seat => seat = selected)
            : this.state.selectedSeats.push(selected)
            console.log(this.state.selectedSeats);
          }
          toggleColor() {
            this.setState({availability: !this.state.availability})
          }

        render() {
            //   console.log(this.state.selectedSeats);
            

        return (
            <div className="seat__selection">
                <div className="event__image">
                    <img src={this.state.eventDetails.eimage} alt="" className="event__image__size" />
                </div>
                <div className="event__details">
                    <h2>{this.state.eventDetails.title}</h2>
                    <p className="event__des">{this.state.eventDetails.description}</p>
                </div>
                <div className="seat__selection__layout">
                    <div className="seat__block_platinum seat__blocks">
                        <h5 className="block__name">Block 1</h5>
                        {[...Array(this.state.cols)].map((el, index) => <section className="seats" id={"A" + index} 
                        style={this.state.availability ? this.state.seatselectedColor : this.state.seatavailableColor } key={index} 
                        onClick={(e) => {this.selectedSeat("A", index+1); this.toggleColor()}}>{`A ${index + 1}`}</section>)}
                    </div>
                    <div className="seat__block_gold seat__blocks">
                        <h5 className="block__name">Block 2</h5>
                        {[...Array(this.state.cols)].map((el, index) => <section className="seats" id={"B" + index} 
                        style={this.state.availability ? this.state.seatselectedColor : this.state.seatavailableColor } key={index} 
                        onClick={(e) => this.selectedSeat("B", index+1)}>{`B ${index + 1}`}</section>)}
                    </div>
                    <div className="seat__block_silver seat__blocks">
                        <h5 className="block__name">Block 3</h5>
                        {[...Array(this.state.cols)].map((el, index) => <section className="seats" id={"C" + index} 
                        style={this.state.availability ? this.state.seatselectedColor : this.state.seatavailableColor } key={index} 
                        onClick={(e) => this.selectedSeat("C", index+1)}>{`C ${index + 1}`}</section>)}
                    </div>
                </div>
                <div className="seat__screenside"> SCREEN THIS WAY </div>
                <div className="user__details row">
                    <section className="col" >
                        <input type="text" placeholder="Name" className="row" onBlur={(e) => {this.setState({userDetails: { ...this.state.userDetails, name: e.target.value}})}} />
                        <input type="email" placeholder="Email Address" className="row" onBlur={(e) => {this.setState({userDetails: { ...this.state.userDetails, name: e.target.value}})}} />
                        <input type="phone" placeholder="Mobile Number" className="row"onBlur={(e) => {this.setState({userDetails: { ...this.state.userDetails, name: e.target.value}})}} />
                    </section>
                    <section className="seat__fare col">
                        {/* <h4>Selected Seats:</h4>
                        {this.state.selectedSeat ? this.state.selectedSeat.map(seat => (
                            <span key={seat}>{seat}</span>
                        )): null} */}
                        <p>Fare:</p>
                    </section>
                </div>
                    <div className="seat__book">
                        <button className="proceed" >Proceed</button>
                    </div>
            </div>
        )
    }
}

export default SeatSelection
