import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './NewsBlock.module.css';

const decodeHtmlEntities = (html: string): string => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = html;
  return textArea.value;
};

interface Post {
  id: number;
  title: { rendered: string };
  link: string;
  _embedded: {
    'wp:featuredmedia'?: { source_url: string }[];
  };
}

const NewsBlock = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Загружаем данные из API внутри компонента
  useEffect(() => {
    const apiUrl = `https://www.gallery.pl.ua/wp-json/wp/v2/posts?categories=20&_embed&per_page=15`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const postsWithImages = data.filter(
          (post: Post) => post._embedded && post._embedded['wp:featuredmedia']
        );
        setPosts(postsWithImages); // Устанавливаем данные в стейт
      })
      .catch((error) => console.error('Ошибка при загрузке данных:', error));
  }, []); // Пустой массив, чтобы запрос выполнялся только один раз

  if (!posts || posts.length === 0) {
    return <p>Нет доступных новостей</p>; // Если постов нет
  }

  return (
    <div className={styles.newsBlock}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <div className={styles.newsItem}>
              {post._embedded['wp:featuredmedia'] && (
                <Image
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt={decodeHtmlEntities(post.title.rendered)}
                  className={styles.newsImage}
                  loading="lazy"
                  width={300}
                  height={200}
                />
              )}
              <h3>{decodeHtmlEntities(post.title.rendered)}</h3>
              <a href={post.link}>Читати далі...</a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsBlock;
