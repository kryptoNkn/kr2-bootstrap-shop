import React from 'react';
import { Heart, Dog, Sparkles, Star } from 'lucide-react';
import styles from './Atmosphere.module.scss';

interface Review {
  id: number;
  author: string;
  avatarInitial: string;
  date: string;
  rating: number;
  comment: string;
  tag: string;
  photoUrl?: string;
}

const reviewsData: Review[] = [
  {
    id: 1,
    author: 'Екатерина М.',
    avatarInitial: 'Е',
    date: '12 августа 2026',
    rating: 5,
    comment: 'Замечательное место в Газетном переулке! Невероятно вкусный авокадо-тост на бриоши и правильный спешелти фильтр. Настоящий оазис уюта в центре.',
    tag: 'Завтраки & Кофе',
    photoUrl: '/images/review-1.jpg' // Поменяйте имя файла на нужное из вашей папки
  },
  {
    id: 2,
    author: 'Александр В.',
    avatarInitial: 'А',
    date: '38 минут назад',
    rating: 5,
    comment: 'Заходим сюда постоянно во время прогулок с собакой. Очень дог-френдли атмосфера, вежливый бариста и всегда свежая выпечка. Сырники просто 10/10!',
    tag: 'Dog Friendly',
    photoUrl: '/images/review-2.jpg'
  },
  {
    id: 3,
    author: 'София K.',
    avatarInitial: 'С',
    date: '2 дня назад',
    rating: 5,
    comment: 'Очень эстетичный интерьер: светлый кирпич, дерево, много света. Идеально подходит как для работы с ноутбуком, так и для встречи с подругой.',
    tag: 'Интерьер & Атмосфера',
    photoUrl: '/images/review-3.jpg'
  }
];

export const Atmosphere: React.FC = () => {
  return (
    <section className={styles.section} id="atmosphere">
      {/* Заголовок секции */}
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h2>Атмосфера SIP</h2>
          <p>Пространство уюта, правильного кофе и вкусных завтраков</p>
        </div>
        <div className={styles.ratingBadge}>
          <Star size={18} className={styles.starIcon} fill="#ffb703" />
          <span>5.0 на Яндекс Картах</span>
        </div>
      </div>

      {/* Преимущества заведения */}
      <div className={styles.cardsGrid}>
        <div className={styles.card}>
          <Dog size={32} className={styles.icon} />
          <h3>Dog Friendly</h3>
          <p>Мы всегда рады вашим питомцам. Для каждого хвостика у нас припасена миска со свежей водой.</p>
        </div>

        <div className={styles.card}>
          <Sparkles size={32} className={styles.icon} />
          <h3>Эстетика деталей</h3>
          <p>Светлая кирпичная кладка, теплое натуральное дерево, фактурная посуда и много естественного света.</p>
        </div>

        <div className={styles.card}>
          <Heart size={32} className={styles.icon} />
          <h3>Завтраки весь день</h3>
          <p>Сырники, авокадо-тосты на бриоши и сытные сэндвичи подаем в любое время работы кофейни.</p>
        </div>
      </div>

      {/* Блок Отзывы гостей */}
      <div className={styles.reviewsHeader}>
        <h3>Отзывы наших гостей</h3>
      </div>

      <div className={styles.reviewsGrid} id="rating">
        {reviewsData.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <div>
              <div className={styles.authorInfo}>
                <div className={styles.avatar}>{review.avatarInitial}</div>
                <div className={styles.authorMeta}>
                  <span className={styles.name}>{review.author}</span>
                  <span className={styles.date}>{review.date}</span>
                </div>
              </div>

              <div className={styles.stars} style={{ marginTop: '1rem' }}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#ffb703" color="#ffb703" />
                ))}
              </div>

              <p className={styles.comment}>{review.comment}</p>
            </div>

            {review.photoUrl && (
              <div className={styles.photoContainer}>
                <img src={review.photoUrl} alt={`Фото от ${review.author}`} />
              </div>
            )}

            <span className={styles.tag}>{review.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
};