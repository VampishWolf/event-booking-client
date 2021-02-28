import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Components/NavBar/Header';
import EventSection from './Components/EventSection/EventSection';
import SeatSelection from './Components/SeatSelection/SeatSelection';


function App() {
  return (
    <Router>
      <div className="App">
        <div className="App__body">
          <Header />
          <Switch>
            {/* <EventSection /> */}
            <Route exact path="/" component={EventSection} />
            <Route path="/Events/:eventId" component={SeatSelection} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
