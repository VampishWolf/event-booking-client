import React, { Component } from 'react'
import configData from '../../config.json'

export class EventSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }

      componentDidMount() {
        fetch(configData.SERVER_URL + '/events')
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result.items
              });
              console.log(result);
            },            
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

    render() {
        return (
            <div>
                {}
            </div>
        )
    }
}

export default EventSection
