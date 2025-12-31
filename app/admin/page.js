'use client';

import { useState, useEffect } from 'react';
import { Users, Calendar, FileText, TrendingUp } from 'lucide-react';
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
                <h2>Status Database</h2>
                <div className={styles.recentList}>
                    <div className={styles.recentItem}>
                        <div className={styles.dot} style={{ background: 'var(--success)' }}></div>
                        <p>Koneksi MongoDB Atlas: <strong>Aktif</strong></p>
                    </div>
                    <div className={styles.recentItem}>
                        <div className={styles.dot}></div>
                        <p>Data sudah beralih dari file JSON ke MongoDB</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
