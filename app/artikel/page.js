'use client';

import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import styles from './Artikel.module.css';

const articles = [
    {
        id: 1,
        title: 'Sukses Gelar LDKS 2024 di Puncak',
        excerpt: 'Kegiatan Latihan Dasar Kepemimpinan Siswa (LDKS) tahun ini berjalan lancar dengan antusiasme tinggi dari para peserta...',
        date: '18 Agu 2024',
        author: 'Admin',
        category: 'Kegiatan',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'Tips Mengatur Waktu Belajar dan Organisasi',
        excerpt: 'Bagi anggota OSIS, membagi waktu antara akademik dan organisasi adalah tantangan tersendiri. Simak tips berikut...',
        date: '05 Sep 2024',
        author: 'Divisi Pendidikan',
        category: 'Edukasi',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'SMKN 56 Juara Umum Futsal Tingkat Kota',
        excerpt: 'Tim Futsal sekolah kita kembali menorehkan prestasi membanggakan dengan membawa pulang piala juara umum...',
        date: '12 Okt 2024',
        author: 'Divisi Olahraga',
        category: 'Prestasi',
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bde9be2d?q=80&w=1000&auto=format&fit=crop'
    },
];

export default function ArtikelPage() {
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1>Berita & Artikel</h1>
                <p>Informasi terbaru seputar kegiatan dan prestasi sekolah</p>
            </header>

            <div className={styles.container}>
                <div className={styles.grid}>
                    {articles.map((article) => (
                        <article key={article.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <span className={styles.category}>{article.category}</span>
                                <img src={article.image} alt={article.title} className={styles.image} />
                            </div>
                            <div className={styles.content}>
                                <div className={styles.meta}>
                                    <span><Calendar size={14} /> {article.date}</span>
                                    <span><User size={14} /> {article.author}</span>
                                </div>
                                <h2 className={styles.title}>{article.title}</h2>
                                <p className={styles.excerpt}>{article.excerpt}</p>
                                <Link href={`/artikel/${article.id}`} className={styles.readMore}>
                                    Baca Selengkapnya <ArrowRight size={16} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}
