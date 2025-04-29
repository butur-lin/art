'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import Image from 'next/image';

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
  date: string; // добавляем дату!
  _embedded: {
    'wp:featuredmedia'?: { source_url: string }[];
  };
}

const NewsBlock = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const apiUrl = `https://www.gallery.pl.ua/wp-json/wp/v2/posts?categories=20&_embed&per_page=20`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const postsWithImages = data.filter(
          (post: Post) => post._embedded && post._embedded['wp:featuredmedia']
        );
        setPosts(postsWithImages);
      })
      .catch((error) => console.error('Ошибка при загрузке данных:', error));
  }, []);

  if (!posts || posts.length === 0) {
    return <section className="py-20 px-6 md:px-20 bg-gray-50"></section>;
  }

  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className={styles.newsBlock}>
        <Swiper
          modules={[Navigation, Mousewheel]}
          spaceBetween={20}
          slidesPerView={1}
          speed={800}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: false,
            sensitivity: 1,
          }}
          simulateTouch={true}
          grabCursor={true}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
        >

          {/* Кнопки навигации */}
          <div className={styles.navigationButtons}>
            <div className={styles.navWrapper}>
              <button className={`custom-prev ${styles.navButton}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            </div>
            <div className={styles.navWrapper}>
              <button className={`custom-next ${styles.navButton}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Слайды */}
          {posts.map((post) => (
            <SwiperSlide key={post.id}>
              <div className={styles.newsItem}>
                <div className={styles.imageWrapper}>
                  {/* Дата поверх картинки */}
                  <div className={styles.dateOverlay}>
                    {new Date(post.date).toLocaleDateString('uk-UA', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </div>

                  {/* Картинка */}
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

                  {/* Заголовок поверх картинки при наведении */}
                  <div className={styles.overlay}>
                    <h3>{decodeHtmlEntities(post.title.rendered)}</h3>
                  </div>
                </div>

                {/* Кнопка "Читати далі..." */}
                <a href={post.link} className={styles.readMoreLink}>
                  Читати далі...
                </a>
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </section>
  );
};

export default NewsBlock;
