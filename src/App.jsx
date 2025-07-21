import Header from './components/Header';
import Swiper from './components/Swiper';
import PlansSection from './components/PlansSection';
import MapSection from './components/MapSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import './App.css';
import { PlansProvider } from './contexts/PlansContext';

function App() {
  return (
    <PlansProvider>
      <Header />
      <Swiper />
      <PlansSection />
      <MapSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </PlansProvider>
  );
}

export default App;
