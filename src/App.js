import './App.css';
import Form from './components/form/Form';
import Home from './components/home/Home';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import View from './components/view/View';

function App() {
  
  
  return (
    <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/addBill" element={<Form />} />
              <Route path="/updateBill" element={<Form />} />
              <Route path="/viewBill" element={<View />} />
            </Routes>
          </Router>
      </div>
  );
}

export default App;
