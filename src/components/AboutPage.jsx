import React from 'react';
import './About.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      <h1 className="about-heading">About Us</h1>
      <p className="about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla odio id justo fermentum, sit amet facilisis ex viverra. Nullam scelerisque ex enim, sit amet hendrerit libero iaculis vel. Aliquam tincidunt rutrum urna, in posuere neque volutpat ut. Pellentesque vitae dui lacinia, lacinia nisl eu, laoreet sem. Sed pretium nisl vitae turpis porttitor, vel efficitur risus vulputate.</p>
      
      <h2 className="about-subheading">Contact Information</h2>
      <ul>
        <li>Email: <a href="mailto:example@email.com">example@email.com</a></li>
        <li>Phone: 123-456-7890</li>
        <li>Address: 123 Main St, Anytown USA 12345</li>
      </ul>
      
      <h2 className="about-subheading">About Me</h2>
      <p className="about-text">My name is John Doe and I am a web developer based in Anytown USA. I specialize in building responsive web applications using modern web technologies.</p>
      
      <h2 className="about-subheading">About Our Company</h2>
      <p className="about-text">Our company was founded in 2010 and has since been dedicated to providing high-quality web development services to our clients. We believe in building long-term relationships with our clients and delivering projects on time and within budget.</p>
    </div>
  );
}

export default AboutPage;
