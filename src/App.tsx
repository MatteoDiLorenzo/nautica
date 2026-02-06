import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Breadcrumb } from './components/Breadcrumb';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { Works } from './sections/Works';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Benedetto Di Lorenzo | Tappezzeria Nautica Napoli - Interni & Esterni Yacht</title>
        <meta name="description" content="Tappezzeria nautica artigianale a Napoli dal 1985. Benedetto Di Lorenzo realizza interni ed esterni per yacht e barche: cuscineria, tendalini, coperture su misura. Preventivo gratuito!" />
        <link rel="canonical" href="https://benedettodilorenzo.it/" />
      </Helmet>

      <div className="min-h-screen bg-[var(--navy-900)]">
        {/* Navigation */}
        <Navbar scrolled={scrolled} />
        
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Home', href: '/' }]} />
        
        {/* Main Content */}
        <main>
          <Hero />
          <About />
          <Services />
          <Works />
          <Contact />
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Toast notifications */}
        <Toaster position="top-right" richColors />
      </div>
    </>
  );
}

export default App;
