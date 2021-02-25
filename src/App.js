import './App.scss';
import Header from './Components/NavBar/Header';
import EventSection from './Components/EventSection/EventSection';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Header />
        <EventSection />
      </div>
    </div>
  );
}

export default App;
