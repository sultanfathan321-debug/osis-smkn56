'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import styles from './ActivityPreview.module.css';

const activities = [
    {
        id: 1,
        title: 'LDKS Calon Pengurus OSIS 2024',
        date: '15-17 Agu 2024',
        location: 'Puncak, Bogor',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop',
        category: 'Event'
    },
    {
        id: 2,
        title: 'Class Meeting Semester Ganjil',
        date: '10-14 Des 2024',
        location: 'Lapangan Sekolah',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop',
        category: 'Lomba'
    },
    {
        id: 3,
        title: 'Bakti Sosial & Santunan Yatim',
        date: '05 Jan 2025',
        location: 'Musholla Al-Ikhlas',
        image: 'https://images.unsplash.com/photo-1593113598340-068cae91c702?q=80&w=1000&auto=format&fit=crop',
        category: 'Sosial'
    }
];

export default function ActivityPreview() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <span className={styles.subtitle}>Kegiatan Kami</span>
                        <h2 className={styles.title}>Dokumentasi Terbaru</h2>
                    </div>
                    <Link href="/galeri" className={styles.link}>
                        Lihat Semua <ArrowRight size={20} />
                    </Link>
                </div>

                <div className={styles.grid}>
                    {activities.map((item) => (
                        <div key={item.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <span className={styles.category}>{item.category}</span>
                                <img src={item.image} alt={item.title} className={styles.image} />
                            </div>
                            <div className={styles.content}>
                                <div className={styles.meta}>
                                    <span className={styles.metaItem}>
                                        <Calendar size={16} /> {item.date}
                                    </span>
                                    <span className={styles.metaItem}>
                                        <MapPin size={16} /> {item.location}
                                    </span>
                                </div>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
