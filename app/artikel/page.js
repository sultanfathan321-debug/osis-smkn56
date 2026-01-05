'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import styles from './Artikel.module.css';

export default function ArtikelPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Helper function to check if content is new (within 7 days)
    const isNew = (createdAt) => {
        if (!createdAt) return false;
        const created = new Date(createdAt);
        const now = new Date();
        const diffTime = Math.abs(now - created);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    };

    useEffect(() => {
        fetch('/api/articles')
            .then(res => res.json())
            .then(data => {
                setArticles(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, []);

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1>Berita & Artikel</h1>
                <p>Informasi terbaru seputar kegiatan dan prestasi sekolah</p>
            </header>

            <div className={styles.container}>
                {loading ? (
                    <div style={{ textAlign: 'center', color: 'var(--muted-foreground)' }}>Loading...</div>
                ) : (
                    <div className={styles.grid}>
                        {Array.isArray(articles) && articles.length > 0 ? (
                            articles.map((article) => (
                                <article key={article.id} className={styles.card}>
                                    <div className={styles.imageWrapper}>
                                        <span className={styles.category}>{article.category}</span>
                                        {isNew(article.createdAt) && (
                                            <span className={styles.newBadge}>NEW</span>
                                        )}
                                        <img
                                            src={article.image || 'https://via.placeholder.com/400x200?text=No+Image'}
                                            alt={article.title}
                                            className={styles.image}
                                        />
                                    </div>
                                    <div className={styles.content}>
                                        <div className={styles.meta}>
                                            <span><Calendar size={14} /> {article.date}</span>
                                            <span><User size={14} /> {article.author}</span>
                                        </div>
                                        <h2 className={styles.title}>{article.title}</h2>
                                        <p className={styles.excerpt}>
                                            {article.excerpt || article.content?.substring(0, 100) + '...'}
                                        </p>
                                        <Link href={`/artikel/${article.id}`} className={styles.readMore}>
                                            Baca Selengkapnya <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', color: 'var(--muted-foreground)', gridColumn: '1/-1' }}>Belum ada artikel.</p>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
