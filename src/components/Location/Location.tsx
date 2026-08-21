import React from 'react';
import styles from './Location.module.scss';
import { MapPin, Clock, Phone, Navigation, ExternalLink } from 'lucide-react';

export const Location: React.FC = () => {
  // Ссылка на построение маршрута в Яндекс Картах
  const routeUrl = "https://yandex.ru/maps?ll=37.608021,55.757166&mode=routes&rtext=~55.757165,37.608021&z=17";
  
  // Ссылка на организацию в Яндекс Картах
  const yandexOrgUrl = "https://yandex.ru/maps/org/122754033471";

  // Ссылка на официальный виджет Яндекса с меткой заведения (orgid / oid)
  const mapIframeUrl = "https://yandex.ru/map-widget/v1/?oid=122754033471&ol=biz&z=16";

  return (
    <section className={styles.section} id="contacts">
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h2>Где мы находимся</h2>
          <p>Ждём вас в гости на чашечку свежесваренного кофе в самом центре Москвы!</p>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.infoCard}>
          <div className={styles.brandBadge}>SIP COFFEE</div>
          
          <div className={styles.infoGroup}>
            <div className={styles.infoItem}>
              <MapPin className={styles.icon} size={24} />
              <div>
                <span className={styles.label}>Адрес</span>
                <a 
                  href={yandexOrgUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.addressLink}
                >
                  Москва, Газетный переулок, 3 <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Clock className={styles.icon} size={24} />
              <div>
                <span className={styles.label}>Режим работы</span>
                <p className={styles.value}>Пн — Пт: 08:00 – 22:00</p>
                <p className={styles.value}>Сб — Вс: 10:00 – 22:00</p>
                <span className={styles.subtext}>Скидка 20% с 19:00 на кухню и выпечку</span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Phone className={styles.icon} size={24} />
              <div>
                <span className={styles.label}>Телефон</span>
                <a href="tel:+79587512149" className={styles.valueLink}>
                  +7 (958) 751-21-49
                </a>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <a 
              href={routeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.primaryBtn}
            >
              <Navigation size={18} />
              Открыть на карте
            </a>
          </div>
        </div>

        {/* Виджет карты с МЕТКОЙ ЗАВЕДЕНИЯ */}
        <div className={styles.mapWrapper}>
          <iframe 
            title="Яндекс Карта — SIP Coffee"
            src={mapIframeUrl} 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            allowFullScreen={true}
            className={styles.iframe}
          />
        </div>
      </div>
    </section>
  );
};