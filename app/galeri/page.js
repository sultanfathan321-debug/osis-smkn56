'use client';

import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import styles from './Galeri.module.css';

const images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop', category: 'Event', title: 'Class Meeting' },
    { id: 2, src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop', category: 'Event', title: 'LDKS' },
    { id: 3, src: 'https://images.unsplash.com/photo-1593113598340-068cae91c702?q=80&w=1000&auto=format&fit=crop', category: 'Sosial', title: 'Bakti Sosial' },
    { id: 4, src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop', category: 'Rapat', title: 'Rapat Kerja' },
    { id: 5, src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop', category: 'Event', title: 'Pentaspai' },
    { id: 6, src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop', category: 'Lomba', title: 'Juara 1 Futsal' },
];

export default function GaleriPage() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter] = useState('Semua');

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

                <div className={styles.grid}>
                    {filteredImages.map((img) => (
                        <div key={img.id} className={styles.card} onClick={() => setSelectedImage(img)}>
                            <div className={styles.imageWrapper}>
                                <img src={img.src} alt={img.title} className={styles.image} />
                                <div className={styles.overlay}>
                                    <ZoomIn color="white" size={32} />
                                    <span>{img.title}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal / Lightbox */}
            {selectedImage && (
                <div className={styles.modal} onClick={() => setSelectedImage(null)}>
                    <button className={styles.closeBtn}><X size={32} /></button>
                    <img src={selectedImage.src} alt={selectedImage.title} className={styles.modalImage} onClick={(e) => e.stopPropagation()} />
                    <div className={styles.modalCaption}>{selectedImage.title}</div>
                </div>
            )}
        </main>
    );
}
