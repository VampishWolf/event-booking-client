import React, { Component } from 'react'
import socketClient  from "socket.io-client";
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
          
          selectedSeats: [],
          userDetails: {
              name: "",
              email: "",
              mobile: ""
          },

          rows: 2,
          cols: 20,
          availability: 0,
          seatavailable: {color:'#72FF72'},
          seatselected: {color:'grey'}
          
        };
      }

      componentDidMount() {
            var socket = socketClient(configData.SERVER_URL);

            this.fetchSeats("6038059725bd8b9fcc7b59f4");
      }

      fetchSeats = (val) => {
        axios.get(configData.SERVER_URL + '/seats/' + val)
        .then((res) => {
            this.setState({events: res.data});
            console.log(res.data);
          });
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
        
        createBooking (val) {
            console.log(this.state.rows);
        }
        render() {
        //   console.log(this.state.selectedSeats);
        

        return (
            <div className="seat__selection">
                <div className="event__image">
                    <img src="https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/ec67dec8b6e1ac19a5e177f350667ae5e71e81f79e2261ee5f66413129f5c66c._V_SX1080_.jpg" sizes="(max-width: 28em) 360px, (max-width: 55em) 720px, (min-width: 55em) 1080px, 1080px" alt="" />
                </div>
                <div className="event__details">
                    <h2>Vampire Diaries</h2>
                    <p className="event__des">Elit duis sint ullamco ipsum amet. Exercitation ut anim culpa dolor voluptate ipsum aliquip. Nisi esse ad ipsum reprehenderit aliqua ipsum irure cupidatat fugiat. Incididunt ut nulla dolor duis quis enim laborum amet dolor esse in nisi.</p>
                </div>
                <div className="seat__selection__layout">
                    <div className="seat__block_platinum seat__blocks">
                        <h5 className="block__name">Block 1</h5>
                        {[...Array(this.state.cols)].map((el, index) => <section className="seats" id={"P" + index} style={this.state.availability ? this.state.seatselected : this.state.seatavailable } key={index} onClick={(e) => this.selectedSeat("P", index)}>{index}</section>)}
                    </div>
                    <div className="seat__block_gold seat__blocks">
                        <h5 className="block__name">Block 2</h5>
                        {[...Array(this.state.cols)].map((el, index) => <section className="seats" id={"G" + index} key={index} onClick={(e) => this.selectedSeat("G", index)}>{index}</section>)}
                    </div>
                    <div className="seat__block_silver seat__blocks">
                        <h5 className="block__name">Block 3</h5>
                        {[...Array(this.state.cols)].map((el, index) => <section className="seats" id={"S" + index} key={index} onClick={(e) => this.selectedSeat("S", index)}>{index}</section>)}
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
                        <h4>Selected Seats:</h4>
                        <p>A1, B1</p>
                        <p>Fare: 420</p>
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
