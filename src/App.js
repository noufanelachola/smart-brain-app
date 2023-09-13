import './App.css';
import Navigation from "./components/Navigation/Navigation"; 
import Rank from "./components/Rank/Rank"; 
import Description from "./components/Description/Description"; 

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Rank />
      <Description />
    </div>
  );
}

export default App;
