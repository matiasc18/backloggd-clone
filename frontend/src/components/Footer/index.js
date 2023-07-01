import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <a href="https://github.com/matiasc18" id="github-link" target="_blank" rel="noreferrer"><FaGithub size="1.5em" /></a>
      <a href="https://www.linkedin.com/in/matias-carulli-139185236/" id="github-link" target="_blank" rel="noreferrer"><FaLinkedin size="1.5em" /></a>
      <Link to="/about-frontloggd" id="about-frontloggd">About</Link>
      <a href="https://www.igdb.com/" target="_blank" rel="noreferrer" id="igdb-shoutout">IGDB</a>
      <span id="backloggd-clone">Heavily inspired by
        <a href="https://www.backloggd.com/" target="_blank" rel="noreferrer"> Backloggd</a> &
        <a href="https://ggapp.io/" target="_blank" rel="noreferrer"> GG</a>
      </span>
    </footer>
  )
}

export default Footer;