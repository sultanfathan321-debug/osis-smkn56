'use client';

import { Users, Calendar, FileText, TrendingUp } from 'lucide-react';
import styles from './Dashboard.module.css';

const summary = [
    { label: 'Total Anggota', value: '56', icon: Users, color: 'blue' },
    { label: 'Total Agenda', value: '12', icon: Calendar, color: 'green' },
    { label: 'Total Artikel', value: '8', icon: FileText, color: 'orange' },
    { label: 'Pengunjung', value: '1.2k', icon: TrendingUp, color: 'purple' },
];

export default function AdminDashboard() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Dashboard Overview</h1>
                <p>Selamat datang kembali, Admin!</p>
            </header>

            <div className={styles.grid}>
                {summary.map((item, index) => (
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
                <h2>Aktivitas Terbaru</h2>
                <div className={styles.recentList}>
                    {/* Placeholder for recent activities */}
                    <div className={styles.recentItem}>
                        <div className={styles.dot}></div>
                        <p><strong>Admin</strong> memposting artikel baru "Kegiatan LDKS 2024"</p>
                        <span className={styles.time}>2 jam yang lalu</span>
                    </div>
                    <div className={styles.recentItem}>
                        <div className={styles.dot}></div>
                        <p><strong>Admin</strong> menambahkan agenda "Rapat Evaluasi"</p>
                        <span className={styles.time}>5 jam yang lalu</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
