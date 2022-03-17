import logo from './logo.svg';
import './App.css';

import ValueField from './components/ValueField'
import Values from './components/Values';
import LoadNutrientView from './components/LoadNutrientView';

function App() {
  return (
    <div className="App">
      {/* <Values></Values> */}
      <LoadNutrientView></LoadNutrientView>
    </div>
  );
}

export default App;
