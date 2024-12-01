import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Mapbox</h4>
          <ul>
            <li>Sign Up</li>
            <li>Pricing</li>
            <li>Support</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Products</h4>
          <ul>
            <li>Maps Overview</li>
            <li>Mapbox GL JS</li>
            <li>Mobile Maps SDK</li>
            <li>Studio</li>
            <li>Static Maps</li>
            <li>Mapbox Tiling Service</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Navigation</h4>
          <ul>
            <li>Navigation Overview</li>
            <li>Navigation SDK for Automotive</li>
            <li>Navigation SDK for Mobile</li>
            <li>Matrix API</li>
            <li>Mapbox for EV</li>
            <li>ADAS SDK</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Solutions</h4>
          <ul>
            <li>Logistics</li>
            <li>Automotive</li>
            <li>Business Intelligence</li>
            <li>On-Demand Logistics</li>
            <li>Weather</li>
            <li>Telecommunications</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>Who we are</li>
            <li>What we do</li>
            <li>What we value</li>
            <li>Newsroom</li>
            <li>Careers</li>
            <li>Sustainability</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>All Rights Reserved © 5pace4</p>
        <div className="social-icons">
          <span>Terms</span> | <span>Privacy</span> | <span>Security</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
