import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing utilities
import Navbar from './components/Navbar';
import BestPath from './components/BestPath';
import Contact from './components/Contact';
import Footer from './components/Footer';
// import { useNavigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './components/Home';
import SafetyGuidelines from './components/SafetyGuidelines';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/best-path" element={<BestPath />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/safety-guidelines" element={<SafetyGuidelines />}></Route>
      </Routes>
      <ScrollToTop></ScrollToTop>
      <Footer />
    </Router>
  );
}

export default App;
