import AOS from 'aos';
import 'aos/dist/aos.css';

const initializeAOS = () => {
  AOS.init({
    duration: 800, // Animation duration
    easing: 'ease-in-out', // Animation easing
    once: true, // Animation occurs only once
  });
};

export default initializeAOS;