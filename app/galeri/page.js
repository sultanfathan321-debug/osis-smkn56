'use client';

import { useState, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import styles from './Galeri.module.css';

export default function GaleriPage() {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter] = useState('Semua');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/dokumentasi')
            .then(res => res.json())
            .then(data => {
                setImages(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch galeri:", err);
                setLoading(false);
            });
    }, []);

    const filteredImages = filter === 'Semua' ? images : images.filter(img => img.category === filter);

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1>Galeri Kegiatan</h1>
                <p>Kumpulan momen terbaik kami</p>
            </header>

            <div className={styles.container}>
                <div className={styles.filterBar}>
                    {['Semua', 'Event', 'Rapat', 'Lomba', 'Sosial'].map((cat) => (
                        <button
                            key={cat}
                            className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted-foreground)' }}>Memuat Galeri...</div>
                ) : images.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted-foreground)' }}>Belum ada foto kegiatan.</div>
                ) : (
                    <div className={styles.grid}>
                        {filteredImages.map((img) => (
                            <div key={img._id} className={styles.card} onClick={() => setSelectedImage(img)}>
                                <div className={styles.imageWrapper}>
                                    <img src={img.image} alt={img.title} className={styles.image} />
                                    <div className={styles.overlay}>
                                        <ZoomIn color="white" size={32} />
                                        <span>{img.title}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal / Lightbox */}
            {selectedImage && (
                <div className={styles.modal} onClick={() => setSelectedImage(null)}>
                    <button className={styles.closeBtn}><X size={32} /></button>
                    <img src={selectedImage.image} alt={selectedImage.title} className={styles.modalImage} onClick={(e) => e.stopPropagation()} />
                    <div className={styles.modalCaption}>{selectedImage.title}</div>
                </div>
            )}
        </main>
    );
}
