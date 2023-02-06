import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <a href="https://github.com/matiasc18" id="github-link" target="_blank" rel="noreferrer"><FaGithub size="1.5em"/></a>
      <a href="https://www.linkedin.com/in/matias-carulli-139185236/" id="github-link" target="_blank" rel="noreferrer"><FaLinkedin size="1.5em"/></a>
      <Link to="/about-frontloggd" id="about-frontloggd">About</Link>
      <span id="igdb-shoutout">IGDB</span>
      <span id="backloggd-clone">Not my original concept, merely a clone of
        <a href="https://www.backloggd.com/" target="_blank" rel="noreferrer"> Backloggd</a>
      </span>
    </footer>
  )
}

export default Footer;