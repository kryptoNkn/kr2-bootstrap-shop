import React from 'react';
import { Coffee, ArrowRight, Clock, MapPin, Moon, Sparkles } from 'lucide-react';
import styles from './Hero.module.scss';

export const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.bgGrid} />
      
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.tag}>
            <Coffee size={16} />
            <span>Спешелти Кофейня • Газетный, 3</span>
          </div>

          <h1 className={styles.title}>
            SIP: Завтраки <br />
            <span className={styles.highlight}>& Летний Special</span>
          </h1>

          <p className={styles.description}>
            Свежеобжаренный кофе, эстетичные завтраки весь день и авторские напитки в тихом центре Москвы.
          </p>

          <div className={styles.ctaGroup}>
            <a href="#menu" className={styles.btnPrimary}>
              <span>Изучить меню</span>
              <ArrowRight size={18} />
            </a>
            <a href="#contacts" className={styles.btnSecondary}>
              <MapPin size={18} />
              <span>Как добраться</span>
            </a>
          </div>
        </div>

        {/* Переработанный блок скидки */}
        <div className={styles.promoCard} id="promos">
          <div className={styles.promoGlow} />

          <div className={styles.promoTop}>
            <div className={styles.timeTag}>
              <Moon size={15} />
              <span>После 19:00</span>
            </div>
            <div className={styles.discountBadge}>
              <span>-20%</span>
            </div>
          </div>

          <div className={styles.promoBody}>
            <div className={styles.specialHeader}>
              <h3>Evening Hours Special</h3>
              <Sparkles size={18} className={styles.sparkleIcon} />
            </div>

            <p className={styles.promoText}>
              Приходите на вечерние сет-завтраки, горячую кухню и свежую выпечку с витрины со скидкой 20%.
            </p>

            <div className={styles.promoFooter}>
              <Clock size={15} />
              <span>Действует ежедневно с 19:00 до 22:00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};