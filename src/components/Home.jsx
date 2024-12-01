import '../styles/Home.css';
import carImage from '../assets/images/car.png';
import info1 from '../assets/images/c1.jpg';
import info2 from '../assets/images/c2.jpg';
import info3 from '../assets/images/c3.jpg';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Main Content Section */}
      <main className="main-content">
        <h1>Understanding CO2 Emissions from Cars</h1>
        <p>
        Carbon dioxide (CO2) is one of the primary greenhouse gases responsible for global warming. It plays a significant role in the Earth's natural greenhouse effect, which helps maintain temperatures suitable for life. However, human activities, particularly the burning of fossil fuels (like coal, oil, and natural gas), deforestation, and industrial processes, have dramatically increased CO2 levels in the atmosphere.
        </p>

        <div className="button-group">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/best-path')}
          >
            Start Your Journey
          </button>

          <button className="btn btn-secondary">Contact sales</button>
        </div>

        {/* Animated Car Section */}
        <div className="animated-car">
          <img src={carImage} alt="Car" />
        </div>

        {/* Information Sections */}
        <section className="info-image">
          <div className="info-card">
            <h2>CO2 Emissions: A Growing Concern</h2>
            <p>
              CO2 emissions from cars are one of the major contributors to
              global warming. Each year, millions of vehicles worldwide release
              billions of tons of CO2 into the atmosphere. The combustion of
              fossil fuels like petrol and diesel is the primary source of these
              emissions.
            </p>
          </div>
          <div className="image-card">
            <img src={info1} alt="CO2 emissions" />
          </div>
        </section>

        <section className="image-info">
          <div className="image-card">
            <img src={info2} alt="Car" />
          </div>
          <div className="info-card">
            <h2>How CO2 Affects Our Environment</h2>
            <div>
              <p>
                Excessive <strong>CO₂ in the atmosphere</strong> amplifies the
                <strong> greenhouse effect</strong>, where heat is trapped by
                greenhouse gases like carbon dioxide, methane, and nitrous
                oxide. This trapped heat prevents it from escaping back into
                space, leading to a gradual increase in the Earth surface
                temperature, known as <strong>global warming</strong>.
                <ul className="affect">
                  <li>
                    <strong>Rising sea levels</strong>: Melting ice sheets and
                    glaciers contribute to the expansion of oceans, submerging
                    coastal areas and displacing millions of people.
                  </li>
                  <li>
                    <strong>Melting ice caps</strong>: Arctic and Antarctic ice
                    is shrinking at alarming rates, disrupting ecosystems and
                    threatening species like polar bears and penguins.
                  </li>
                  <li>
                    <strong>Extreme weather events</strong>: Increased heat
                    energy in the atmosphere leads to stronger hurricanes,
                    intense droughts, floods, and unseasonal storms.
                  </li>
                  <li>
                    <strong>Disrupted ecosystems</strong>: Many plant and animal
                    species struggle to adapt to the rapidly changing
                    environment, leading to biodiversity loss.
                  </li>
                  <li>
                    <strong>Impact on agriculture</strong>: Changing weather
                    patterns and increased temperatures result in crop failures,
                    threatening food security globally.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </section>

        <section className="info-image">
          <div className="info-card">
            <h2>What You Can Do to Help</h2>
            <p>
              Individuals and companies alike can take action to reduce CO2
              emissions. Switching to electric vehicles, using public transport,
              and adopting renewable energy sources are just a few of the many
              ways we can make a difference.
              <ul>
                <li>Switch to electric vehicles (EVs) or hybrid cars.</li>
                <li>Use public transportation, carpool, or bike.</li>
                <li>
                  Adopt green energy sources like solar power for your home.
                </li>
              </ul>
            </p>
          </div>
          <div className="image-card">
            <img src={info3} alt="CO2 emissions reduction" />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
