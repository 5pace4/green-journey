import '../styles/contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Hero Section */}
      <div className="contact-hero">
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-description">
          Whether you have questions, feedback, or just want to say hello, we
          are here to help. Reach out to us anytime!
        </p>
      </div>

      {/* Contact Form Section */}
      <div className="contact-section">
        <div className="contact-form-wrapper">
          <h2>Contact Form</h2>
          <p>
            We’d love to hear from you! Fill out the form below, and we’ll get
            back to you shortly.
          </p>
          <form className="contact-form">
            <input
              type="text"
              className="contact-input"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              className="contact-input"
              placeholder="Your Email"
              required
            />
            <input
              type="text"
              className="contact-input"
              placeholder="Subject"
              required
            />
            <textarea
              className="contact-textarea"
              rows="5"
              placeholder="Your Message"
              required
            ></textarea>
            <button className="contact-submit">Send Message</button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="contact-info-wrapper">
          <h2>Contact Information</h2>
          <p>
            Feel free to reach out directly using the following contact details:
          </p>
          <p>
            Email:{' '}
            <a href="mailto:support@greenjourney.com">
              support@greenjourney.com
            </a>
          </p>
          <p>Phone: +123 456 7890</p>
          <p>Address: Green Journey HQ, Eco Lane, Sustainable City</p>
          <div className="social-links">
            <a href="#" className="social-icon">
              🌐
            </a>
            <a href="#" className="social-icon">
              📘
            </a>
            <a href="#" className="social-icon">
              🐦
            </a>
            <a href="#" className="social-icon">
              📸
            </a>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <h2>Find Us Here</h2>
        <iframe
          className="map-iframe"
          src="https://www.google.com/maps/embed?pb=!1m18..."
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
        ></iframe>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <h2>Subscribe to Our Newsletter</h2>
        <p>Stay updated with our latest news and eco-friendly tips!</p>
        <div className="newsletter-form">
          <input
            type="email"
            className="newsletter-input"
            placeholder="Your Email Address"
            required
          />
          <button className="newsletter-submit">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
