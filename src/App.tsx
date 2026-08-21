import React, { useEffect } from 'react';
import './styles/global.scss';
import { Topbar } from './components/Topbar/Topbar';
import { Hero } from './components/Hero/Hero';
import { Menu } from './components/Menu/Menu';
import { Atmosphere } from './components/Atmosphere/Atmosphere';
import { Footer } from './components/Footer/Footer';
import { Location } from './components/Location/Location';

export const App: React.FC = () => {
  useEffect(() => {
    const preventCopy = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Блокировка вызова контекстного меню (правой кнопки мыши)
    document.addEventListener('contextmenu', preventCopy);

    return () => {
      document.removeEventListener('contextmenu', preventCopy);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Topbar />
      <main style={{ flex: 1 }}>
        <Hero />
        <Menu />
        <Atmosphere />
        <Location />
      </main>
      <Footer />
    </div>
  );
};

export default App;
