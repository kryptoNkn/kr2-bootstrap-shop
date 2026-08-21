import React from 'react';
import { MapPin, Send, Phone } from 'lucide-react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} id="contacts">
      <div className={styles.inner}>
        <img src="/images/logo.png" alt="SIP Coffee" className={styles.logoImg} />

        <div className={styles.links}>
          <a href="https://yandex.ru/maps/org/122754033471" target="_blank" rel="noreferrer">
            <MapPin size={18} />
            <span>Москва, Газетный переулок, 3</span>
          </a>
          <a href="https://telegram.me/sipcoffeemoscow" target="_blank" rel="noreferrer">
            <Send size={18} />
            <span>Telegram: @sipcoffeemoscow</span>
          </a>
          <a href="tel:+79587512149">
            <Phone size={18} />
            <span>+7 (958) 751-21-49</span>
          </a>
        </div>

        <div className={styles.legal}>
          Индивидуальный предприниматель Дурасов Семен Михайлович<br />
          ОГРНИП: 320774600340580 | ИНН: 772075470057
        </div>

        <div className={styles.copyright}>
          © WaterMelonStudios 2026. Все права защищены. 
        </div>
      </div>
    </footer>
  );
};