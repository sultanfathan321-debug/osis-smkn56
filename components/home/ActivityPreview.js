'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import styles from './ActivityPreview.module.css';

export default function ActivityPreview() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/dokumentasi')
            .then(res => res.json())
            .then(data => {
                // Get latest 3 items
                const sorted = Array.isArray(data)
                    ? [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3)
                    : [];
                setActivities(sorted);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load activities", err);
                setLoading(false);
            });
    }, []);

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

                {loading ? (
                    <div className={styles.grid}>
                        {[1, 2, 3].map(i => (
                            <div key={i} className={styles.card} style={{ opacity: 0.5 }}>
                                <div className={styles.imageWrapper} style={{ background: 'var(--muted)', height: '200px' }}></div>
                                <div className={styles.content}>
                                    <div style={{ height: '20px', background: 'var(--muted)', width: '60%', borderRadius: '4px' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : activities.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted-foreground)', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                        Belum ada dokumentasi terbaru.
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {activities.map((item) => (
                            <div key={item._id} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <span className={styles.category}>{item.category}</span>
                                    <img src={item.image} alt={item.title} className={styles.image} />
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.meta}>
                                        <span className={styles.metaItem}>
                                            <Calendar size={16} /> {item.date || 'Tgl belum diatur'}
                                        </span>
                                        <span className={styles.metaItem}>
                                            <MapPin size={16} /> {item.location || 'Lokasi belum diatur'}
                                        </span>
                                    </div>
                                    <h3 className={styles.cardTitle}>{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
