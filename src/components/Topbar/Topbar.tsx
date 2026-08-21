import React from 'react';
import { Phone, Star } from 'lucide-react';
import styles from './Topbar.module.scss';

export const Topbar: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#" className={styles.logoLink}>
          <img src="/images/logo.png" alt="SIP Coffee" className={styles.logoImg} />
        </a>

        <nav className={styles.nav}>
          <a href="#menu">Меню</a>
          <a href="#atmosphere">Атмосфера</a>
          <a href="#contacts">Контакты</a>
        </nav>

        <div className={styles.actions}>
          <a href="tel:+79587512149" className={styles.phone}>
            <Phone size={16} />
            <span>+7 (958) 751-21-49</span>
          </a>
          <div className={styles.ratingBadge}>
            <Star size={14} className={styles.star} />
            <span>5.0</span>
          </div>
        </div>
      </div>
    </header>
  );
};