import React, { useState } from 'react';
import { Coffee, Utensils, Sparkles } from 'lucide-react';
import styles from './Menu.module.scss';

interface MenuItem {
  name: string;
  sub?: string;
  prices: (number | string)[];
}

interface MenuCategory {
  title: string;
  volumes?: string[];
  items: MenuItem[];
  theme?: 'light' | 'dark' | 'terracotta';
}

const drinksData: MenuCategory[] = [
  {
    title: 'КЛАССИКА',
    volumes: ['200мл', '300мл'],
    items: [
      { name: 'ЭСПРЕССО', prices: [300, ''] },
      { name: 'КАПУЧИНО', prices: [360, 420] },
      { name: 'ЛАТТЕ', prices: ['', 420] },
      { name: 'ФЛЭТ УАЙТ', prices: [390, ''] },
      { name: 'РАФ', prices: ['', 460] },
      { name: 'МАТЧА', sub: 'на любом молоке', prices: ['', 480] },
      { name: 'КАКАО', sub: 'альтернативное молоко +90', prices: ['', 410] },
    ],
  },
  {
    title: 'БРЮ БАР',
    volumes: ['200мл', '300мл'],
    items: [
      { name: 'ФИЛЬТР КОФЕ', prices: [300, 350] },
      { name: 'ВОРОНКА', prices: [400, ''] },
      { name: 'АЭРОПРЕСС', prices: [400, ''] },
    ],
  },
  {
    title: 'АВТОРСКИЕ НАПИТКИ',
    volumes: ['300мл'],
    items: [
      { name: 'ЛАТТЕ КАРАМЕЛЬ-ГИМАЛАЙСКАЯ СОЛЬ', prices: [480] },
      { name: 'РАФ ПРЯНЫЙ', prices: [480] },
      { name: 'РАФ ЛАВАНДА-КЛУБНИКА', prices: [480] },
      { name: 'РАФ ЦИТРУС-МУСКАТ', prices: [480] },
      { name: 'РАФ АРАХИСОВЫЙ', prices: [480] },
      { name: 'МАТЧА ЖАСМИН', prices: [480] },
    ],
  },
  {
    title: 'ЧАИ',
    volumes: ['300мл', '600мл'],
    items: [
      { name: 'ГРЕЧИШНЫЙ', prices: [370, 480] },
      { 
        name: 'ЛИСТОВЫЕ:', 
        sub: 'ассам / эрл грей / сенча / молочный улун / зеленый чай с жасмином / каркаде', 
        prices: [370, 480] 
      },
    ],
  },
];

const seasonalData: MenuCategory[] = [
  {
    title: 'СЕЗОННЫЕ НАПИТКИ',
    volumes: ['300мл'],
    theme: 'terracotta',
    items: [
      { name: 'ГОРЯЧИЙ БАМБЛ', sub: 'вишнёвый или апельсиновый на выбор', prices: [450] },
      { name: 'ЯГОДНЫЙ ФИЛЬТР', prices: [450] },
      { name: 'ЛАТТЕ ФИСТАШКА-МАРЦИПАН', prices: [480] },
      { name: 'ЛАТТЕ ИМБИРНЫЙ ПРЯНИК', prices: [480] },
      { name: 'РАФ ПРЯНАЯ ТЫКВА-ДЫНЯ', prices: [480] },
      { name: 'КАКАО ГРУША-БАНАН', prices: [480] },
    ],
  },
  {
    title: 'СОГРЕВАЮЩИЕ ЧАИ & СПЕШЛ',
    volumes: ['300мл', '600мл'],
    theme: 'terracotta',
    items: [
      { name: 'ЧАЙ МАНГО-ЖАСМИН-АПЕЛЬСИН', prices: [470, 620] },
      { name: 'ЕЛО ВЫЙ ЧАЙ', sub: 'с еловым вареньем и розмарином', prices: [470, 620] },
      { name: 'АЙРИШ КОФЕ С ИНЖИРОМ И МАРАКУЙЕЙ', prices: [520, ''] },
      { name: 'ВИШНЁВЫЙ КАКАО-БАМБЛ', sub: 'с пеной из кокосовых сливок', prices: [520, ''] },
    ],
  },
];

const kitchenData: MenuCategory[] = [
  {
    title: 'С ВИТРИНЫ',
    theme: 'dark',
    items: [
      { name: 'КАША РИСОВАЯ НА КОКОСОВОМ МОЛОКЕ', sub: 'с кокосовыми чипсами и соусом манго', prices: [370] },
      { name: 'КАША ОВСЯНАЯ С АРАХИСОМ И КАРАМЕЛЬЮ', prices: [330] },
      { name: 'СЫРНИКИ', sub: 'со сметаной, вареньем или сгущёнкой', prices: [310] },
      { name: 'СЭНДВИЧ С ПАСТРАМИ ИЗ ИНДЕЙКИ', prices: [630] },
      { name: 'СЭНДВИЧ С ПАСТРАМИ ИЗ МРАМОРНОЙ ГОВЯДИНЫ', prices: [630] },
      { name: 'СЭНДВИЧ С ТУНЦОМ', prices: [630] },
      { name: 'КРУАССАН СО СЛАБОСОЛЕНЫМ ЛОСОСЕМ', prices: [520] },
      { name: 'КРУАССАН С МОЦАРЕЛЛОЙ', prices: [450] },
    ],
  },
  {
    title: 'ИЗ-ПОД НОЖА',
    theme: 'dark',
    items: [
      { name: 'ПАСТА КАЗАРЕЧЧЕ С БЕЛЫМИ ГРИБАМИ', prices: [950] },
      { name: 'ПАСТА ЛИНГВИНИ С МОРЕПРОДУКТАМИ', prices: [780] },
      { name: 'АВОКАДО ТОСТ НА БРИОШИ С ЯЙЦОМ ПАШОТ', sub: 'пастрами +150р / креветки +200р / лосось +200р', prices: [650] },
      { name: 'ЗАВТРАК С ЛОСОСЕМ', prices: [740] },
      { name: 'ЗАВТРАК С МЯСНОЙ КОЛБАСКОЙ', prices: [680] },
    ],
  },
];

export const Menu: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'drinks' | 'seasonal' | 'kitchen'>('drinks');

  const getCurrentData = () => {
    switch (activeTab) {
      case 'drinks': return drinksData;
      case 'seasonal': return seasonalData;
      case 'kitchen': return kitchenData;
    }
  };

  return (
    <section className={styles.menuSection} id="menu">
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>МЕНЮ</h2>
        <p className={styles.subtitle}>Качественные ингредиенты & любовь к кофе</p>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'drinks' ? styles.active : ''}`}
          onClick={() => setActiveTab('drinks')}
        >
          <Coffee size={18} />
          <span>НАПИТКИ</span>
        </button>
        <button 
          className={`${styles.tabBtn} ${styles.specialTab} ${activeTab === 'seasonal' ? styles.active : ''}`}
          onClick={() => setActiveTab('seasonal')}
        >
          <Sparkles size={18} />
          <span>СЕЗОННЫЙ SPECIAL</span>
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'kitchen' ? styles.active : ''}`}
          onClick={() => setActiveTab('kitchen')}
        >
          <Utensils size={18} />
          <span>КУХНЯ И ЗАВТРАКИ</span>
        </button>
      </div>

      <div className={styles.grid}>
        {getCurrentData().map((block, idx) => (
          <div 
            key={idx} 
            className={`
              ${styles.block} 
              ${block.theme === 'dark' ? styles.darkTheme : ''} 
              ${block.theme === 'terracotta' ? styles.terracottaTheme : ''}
            `}
          >
            <div className={styles.blockHeader}>
              <h3>{block.title}</h3>
              {block.volumes && (
                <div className={styles.volumes}>
                  {block.volumes.map((vol, vIdx) => (
                    <span key={vIdx}>{vol}</span>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.list}>
              {block.items.map((item, itemIdx) => (
                <div key={itemIdx} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.name}</div>
                    {item.sub && <div className={styles.itemSub}>{item.sub}</div>}
                  </div>
                  <div className={styles.itemPrices}>
                    {item.prices.map((p, pIdx) => (
                      <span key={pIdx}>{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};