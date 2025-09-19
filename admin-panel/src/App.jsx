import { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import PoliceLoginPage from './pages/PoliceLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import PoliceDashboard from './pages/PoliceDashboard';
import { isAuthenticated } from './services/authService';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPoliceLoggedIn, setIsPoliceLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    setIsLoggedIn(isAuthenticated());
    
    // Check if police user is logged in
    setIsPoliceLoggedIn(localStorage.getItem('isPoliceAuthenticated') === 'true');
    
    // Check URL path to set current page
    const path = window.location.pathname;
    if (path.includes('login')) {
      setCurrentPage('login');
    } else if (path.includes('police-login')) {
      setCurrentPage('police-login');
    } else if (path.includes('admin-dashboard')) {
      setCurrentPage('admin-dashboard');
    } else if (path.includes('police-dashboard')) {
      setCurrentPage('police-dashboard');
    }
  }, []);

  // Handle navigation
  const handleLoginClick = (type) => {
    if (type === 'admin') {
      setCurrentPage('login');
      window.history.pushState({}, '', '/login');
    } else if (type === 'police/auth') {
      setCurrentPage('police-login');
      window.history.pushState({}, '', '/police-login');
    }
  }

  // Render the appropriate page based on current state
  const renderPage = () => {
    if (currentPage === 'login') {
      return <LoginPage />;
    } else if (currentPage === 'police-login') {
      return <PoliceLoginPage />;
    } else if (currentPage === 'admin-dashboard' || isLoggedIn) {
      return <AdminDashboard />;
    } else if (currentPage === 'police-dashboard' || isPoliceLoggedIn) {
      return <PoliceDashboard />;
    }

    // Landing page (home) content
    return (
      <>
        {/* Header section with government styling */}
        <header className="gov-header">
          <div className="header-container">
            <div className="logo-section">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                alt="Government Emblem" 
                className="emblem" 
              />
              <div className="header-titles">
                <h1>MINISTRY OF TOURISM</h1>
                <h2>NORTH EASTERN <span className="highlight">REGION</span></h2>
              </div>
            </div>
            <div className="header-actions">
              <button className="accessibility-btn">A+</button>
              <button className="accessibility-btn">A</button>
              <button className="accessibility-btn">A-</button>
              <select className="language-selector">
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
              </select>
            </div>
          </div>
          <nav className="main-nav">
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Tourism</a></li>
              <li><a href="#">Schemes</a></li>
              <li><a href="#">Gallery</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
            <div className="search-box">
              <input type="text" placeholder="Search..." />
              <button><i className="search-icon">🔍</i></button>
            </div>
          </nav>
        </header>

        {/* Main content section */}
        <main className="dashboard-content-land">
          {/* Announcement banner */}
          <div className="announcement-banner">
            <div className="marquee">
              <span>Welcome to North Eastern Tourism Portal • Register for upcoming Cultural Festival in Meghalaya • New Tourism Policy announced for North East Region • Visit Spectacular Dzükou Valley</span>
            </div>
          </div>

          {/* Login options as in the sketch */}
          <section className="login-section">
            <div className="login-container">
              <button 
                className="login-button admin-login"
                onClick={() => handleLoginClick('admin')}
              >
                Admin Login
              </button>
              <button 
                className="login-button police-login"
                onClick={() => handleLoginClick('police/auth')}
              >
                Police/Auth Login
              </button>
            </div>
          </section>

          {/* Tourism showcase section */}
          <section className="tourism-showcase">
            <h2 className="section-title">Discover North East Tourism</h2>
            <div className="tourism-gallery">
              <div className="gallery-item">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Rhinos_at_Kaziranga.jpg/1280px-Rhinos_at_Kaziranga.jpg" 
                  alt="Wildlife Sanctuaries of Assam" 
                />
                <p>Wildlife Sanctuaries of Assam</p>
              </div>
              <div className="gallery-item">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Tawang_Monastery_Arunachal_Pradesh.jpg/800px-Tawang_Monastery_Arunachal_Pradesh.jpg" 
                  alt="Scenic Mountains of Arunachal Pradesh" 
                />
                <p>Scenic Mountains of Arunachal Pradesh</p>
              </div>
              <div className="gallery-item">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/A_dance_from_hornbill_festival_kohima_nagaland.jpg/800px-A_dance_from_hornbill_festival_kohima_nagaland.jpg" 
                  alt="Cultural Festival" 
                />
                <p>Cultural Festivals of Nagaland</p>
              </div>
              <div className="gallery-item">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Living_Root_Bridge_of_Meghalaya.jpg/800px-Living_Root_Bridge_of_Meghalaya.jpg" 
                  alt="Traditional Village" 
                />
                <p>Traditional Villages of Meghalaya</p>
              </div>
            </div>
          </section>

          {/* Government Schemes section */}
          <section className="schemes-section">
            <h2 className="section-title">Government Schemes for North East</h2>
            <div className="schemes-container">
              <div className="scheme-card">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Umiam_Lake_Shillong.jpg/800px-Umiam_Lake_Shillong.jpg" 
                  alt="NESIDS" 
                />
                <div className="scheme-content">
                  <h3>North East Special Infrastructure Development Scheme</h3>
                  <p>100% centrally funded scheme to fill infrastructural gaps in the region.</p>
                  <a href="#" className="scheme-link">Learn More</a>
                </div>
              </div>
              
              <div className="scheme-card">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Road_to_Gurudongmar_Lake_North_Sikkim_India_2012.jpg/800px-Road_to_Gurudongmar_Lake_North_Sikkim_India_2012.jpg" 
                  alt="NEIDS" 
                />
                <div className="scheme-content">
                  <h3>North East Industrial Development Scheme</h3>
                  <p>Promoting industrialization and employment generation in the northeastern states.</p>
                  <a href="#" className="scheme-link">Learn More</a>
                </div>
              </div>
              
              <div className="scheme-card">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Majuli_river_island.jpg/800px-Majuli_river_island.jpg" 
                  alt="PMDP" 
                />
                <div className="scheme-content">
                  <h3>Prime Minister's Development Package for NER</h3>
                  <p>Special package for infrastructure and economic development.</p>
                  <a href="#" className="scheme-link">Learn More</a>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer section */}
        <footer className="gov-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Important Links</h3>
              <ul>
                <li><a href="#">Ministry of Tourism</a></li>
                <li><a href="#">Ministry of DoNER</a></li>
                <li><a href="#">Government of India</a></li>
                <li><a href="#">Digital India</a></li>
                <li><a href="#">MyGov</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>North Eastern States</h3>
              <ul>
                <li><a href="#">Arunachal Pradesh</a></li>
                <li><a href="#">Assam</a></li>
                <li><a href="#">Manipur</a></li>
                <li><a href="#">Meghalaya</a></li>
                <li><a href="#">Mizoram</a></li>
                <li><a href="#">Nagaland</a></li>
                <li><a href="#">Sikkim</a></li>
                <li><a href="#">Tripura</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>Ministry of Tourism, North Eastern Region</p>
              <p>Government of India</p>
              <p>Email: info@netourism.gov.in</p>
              <p>Phone: +91-XXXXXXXXXX</p>
            </div>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} | Content Owned by Ministry of Tourism, Government of India
          </div>
        </footer>
      </>
    );
  }

  return (
    <div className="admin-dashboard">
      {renderPage()}
    </div>
  );
}

export default App;
