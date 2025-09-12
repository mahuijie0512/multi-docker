import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';

function App() {
  console.log('App component rendering...');
  
  return (
   <Router>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Fibonacci Calculator
        </p>
        <div style={{ margin: '20px' }}>
          <Link to="/" style={{ marginRight: '10px', color: 'white' }}>Home</Link>
          <Link to="/otherpage" style={{ color: 'white' }}>Other Page</Link>
        </div>
      </header>
      <div>
        <Routes>
          <Route path="/" element={<Fib />} />
          <Route path="/otherpage" element={<OtherPage />} />
        </Routes>
      </div>
    </div>
   </Router>
  );
}

export default App;
