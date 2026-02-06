import { useState, useEffect } from 'react';
import { Menu, X, Phone, Anchor } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavbarProps {
  scrolled: boolean;
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Chi Siamo', href: '#about' },
  { label: 'Servizi', href: '#services' },
  { label: 'Lavori', href: '#works' },
  { label: 'Contatti', href: '#contact' },
];

export function Navbar({ scrolled }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.replace('#', ''));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--navy-900)]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group"
            aria-label="Benedetto Di Lorenzo - Torna alla home"
          >
            <Anchor className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--azure-500)] transition-transform group-hover:rotate-12" />
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-semibold text-white leading-tight">
                Benedetto Di Lorenzo
              </span>
              <span className="text-xs text-[var(--gray-400)]">
                Tappezzeria Nautica
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative text-sm font-medium transition-colors duration-200 ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-[var(--azure-400)]'
                        : 'text-[var(--gray-300)] hover:text-white'
                    }`}
                    aria-current={activeSection === link.href.replace('#', '') ? 'page' : undefined}
                  >
                    {link.label}
                    {activeSection === link.href.replace('#', '') && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--azure-500)] rounded-full" />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <a
              href="tel:+393482418145"
              className="btn-primary gap-2 text-sm"
              aria-label="Chiama ora"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">348 241 8145</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[280px] sm:w-[320px] bg-[var(--navy-800)] border-l border-[var(--navy-600)] p-0"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-[var(--navy-600)]">
                  <span className="text-lg font-semibold text-white">Menu</span>
                </div>

                {/* Mobile Links */}
                <nav className="flex-1 py-4">
                  <ul className="space-y-1">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className={`flex items-center px-4 py-3 text-base font-medium transition-colors ${
                            activeSection === link.href.replace('#', '')
                              ? 'bg-[var(--azure-500)]/20 text-[var(--azure-400)] border-r-2 border-[var(--azure-500)]'
                              : 'text-[var(--gray-300)] hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile CTA */}
                <div className="p-4 border-t border-[var(--navy-600)]">
                  <a
                    href="tel:+393482418145"
                    className="btn-primary w-full gap-2"
                    aria-label="Chiama ora"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Chiama Ora</span>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
