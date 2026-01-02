'use client';

import { useState, useEffect } from 'react';
import { Users, Calendar, FileText, TrendingUp, Image as ImageIcon, Info, GraduationCap, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import styles from './Dashboard.module.css';

const summary = [
    { label: 'Total Anggota', value: '56', icon: Users, color: 'blue' },
    { label: 'Total Agenda', value: '12', icon: Calendar, color: 'green' },
    { label: 'Total Artikel', value: '8', icon: FileText, color: 'orange' },
    { label: 'Pengunjung', value: '1.2k', icon: TrendingUp, color: 'purple' },
];

export default function AdminDashboard() {
    const [counts, setCounts] = useState({ members: 0, agenda: 0, articles: 0, messages: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [orgRes, agendaRes, articleRes, contactRes] = await Promise.all([
                    fetch('/api/organisasi'),
                    fetch('/api/agenda'),
                    fetch('/api/articles'),
                    fetch('/api/contact')
                ]);

                const orgData = await orgRes.json();
                const agendaData = await agendaRes.json();
                const articleData = await articleRes.json();
                const contactData = await contactRes.json();

                setCounts({
                    members: Array.isArray(orgData) ? orgData.length : 0,
                    agenda: Array.isArray(agendaData) ? agendaData.length : 0,
                    articles: Array.isArray(articleData) ? articleData.length : 0,
                    messages: Array.isArray(contactData) ? contactData.length : 0
                });
            } catch (error) {
                console.error("Error fetching dashboard counts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCounts();
    }, []);

    const summaryData = [
        { label: 'Total Anggota', value: counts.members.toString(), icon: Users, color: 'blue' },
        { label: 'Total Agenda', value: counts.agenda.toString(), icon: Calendar, color: 'green' },
        { label: 'Total Artikel', value: counts.articles.toString(), icon: FileText, color: 'orange' },
        { label: 'Pesan Baru', value: counts.messages.toString(), icon: TrendingUp, color: 'purple' },
    ];

    if (loading) return <div className={styles.container}><p>Memuat data...</p></div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Dashboard Overview</h1>
                <p>Selamat datang kembali, Admin!</p>
            </header>

            <div className={styles.grid}>
                {summaryData.map((item, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.cardIcon} style={{ background: `var(--${item.color}-100)`, color: item.color }}>
                            <item.icon size={24} />
                        </div>
                        <div>
                            <p className={styles.cardLabel}>{item.label}</p>
                            <h3 className={styles.cardValue}>{item.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.recentSection}>
                <h2>Akses Cepat Pengelolaan</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                    {[
                        { label: 'Kelola Jurusan', icon: GraduationCap, path: '/admin/jurusan', color: '#10b981' },
                        { label: 'Info Organisasi', icon: Info, path: '/admin/tentang-info', color: '#3b82f6' },
                        { label: 'Update Galeri', icon: ImageIcon, path: '/admin/dokumentasi', color: '#8b5cf6' },
                        { label: 'Update Artikel', icon: FileText, path: '/admin/artikel', color: '#f59e0b' },
                        { label: 'Jadwal Agenda', icon: Calendar, path: '/admin/agenda', color: '#ef4444' }
                    ].map((item, idx) => (
                        <Link key={idx} href={item.path} style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            background: 'var(--card-bg)',
                            padding: '1.25rem',
                            borderRadius: '12px',
                            border: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.2s'
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.borderColor = 'var(--primary)';
                                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'var(--border)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ background: `${item.color}20`, color: item.color, padding: '0.6rem', borderRadius: '8px', display: 'flex' }}>
                                    <item.icon size={20} />
                                </div>
                                <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{item.label}</span>
                            </div>
                            <ChevronRight size={18} color="var(--muted-foreground)" />
                        </Link>
                    ))}
                </div>
            </div>

            <div className={styles.recentSection} style={{ marginTop: '2.5rem' }}>
                <h2>Status Database & Sistem</h2>
                <div className={styles.recentList}>
                    <div className={styles.recentItem}>
                        <div className={styles.dot} style={{ background: 'var(--success)' }}></div>
                        <p>Koneksi MongoDB Atlas: <strong>Aktif</strong></p>
                    </div>
                    <div className={styles.recentItem}>
                        <div className={styles.dot}></div>
                        <p>Sistem Pengelolaan Jurusan & Visi-Misi: <strong>Terintegrasi</strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
