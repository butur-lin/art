import Image from 'next/image';
import styles from './Gallery.module.css';

const CTE = () => {
  const images = [
    { src: '/CTE/cte-1.jpg', alt: 'Зимний сад 1' },
    { src: '/CTE/cte-2.jpg', alt: 'Зимний сад 2' },
    { src: '/CTE/cte-3.jpg', alt: 'Зимний сад 3' },
    { src: '/CTE/cte-4.jpg', alt: 'Зимний сад 4' }, 
    { src: '/CTE/cte-5.jpg', alt: 'Зимний сад 5' },
	 { src: '/CTE/cte-6.jpg', alt: 'Зимний сад 6' },
  ];
  

  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className={styles['gallery-container']}>
        {images.map((image, index) => (
          <div key={index} className={styles['gallery-item']}>
            <Image
              src={image.src}
              alt={image.alt}
              width={500}
              height={300}
              className={styles['gallery-image']}
              loading="lazy" // lazy loading для изображений
            />
            <div className={styles['overlay']}>
              <h3>{image.alt}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CTE;
