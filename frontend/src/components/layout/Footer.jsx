// Footer.jsx
import React from 'react';
import '../../styles/layout/Footer.css';

function Footer() {
  return (
    <footer className="footer">
        <img
            src="/assets/images/logo.png" 
            alt="logo de Hotel 5 Stars"
            style={{ height: '100px', marginRight: '10px'}} 
          />
      <div className="text-center">
        <p>© 2024 Hotel 5 Stars - Todos los derechos reservados.</p>
        
        <p>
          <a href=" " target="_blank" rel="noopener noreferrer">
            Visita nuestro sitio
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;