'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, FileText, Settings, LogOut, Users, Mail, BarChart, Image as ImageIcon, Info } from 'lucide-react';
import styles from './AdminLayout.module.css';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isActive = (path) => pathname === path;

    // Close sidebar when navigating on mobile
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    return (
        <div className={styles.adminContainer}>
            {/* Mobile Header */}
            <div className={styles.mobileHeader}>
                <div className={styles.logo}>OSIS Admin</div>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={styles.toggleBtn}>
                    {isSidebarOpen ? <LogOut size={24} /> : <LayoutDashboard size={24} />}
                </button>
            </div>

            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
                <div className={styles.sidebarHeader}>
                    <h2>OSIS Admin</h2>
                    <span className={styles.badge}>v1.0</span>
                    <button className={styles.closeBtn} onClick={() => setIsSidebarOpen(false)}>
                        <LogOut size={20} />
                    </button>
                </div>

                <nav className={styles.nav}>
                    <Link href="/admin" className={`${styles.navItem} ${isActive('/admin') ? styles.active : ''}`}>
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link href="/admin/agenda" className={`${styles.navItem} ${isActive('/admin/agenda') ? styles.active : ''}`}>
                        <Calendar size={20} /> Agenda
                    </Link>
                    <Link href="/admin/stats" className={`${styles.navItem} ${isActive('/admin/stats') ? styles.active : ''}`}>
                        <BarChart size={20} /> Statistik
                    </Link>
                    <Link href="/admin/artikel" className={`${styles.navItem} ${isActive('/admin/artikel') ? styles.active : ''}`}>
                        <FileText size={20} /> Artikel
                    </Link>
                    <Link href="/admin/dokumentasi" className={`${styles.navItem} ${isActive('/admin/dokumentasi') ? styles.active : ''}`}>
                        <ImageIcon size={20} /> Dokumentasi
                    </Link>
                    <Link href="/admin/tentang-info" className={`${styles.navItem} ${isActive('/admin/tentang-info') ? styles.active : ''}`}>
                        <Info size={20} /> Info Organisasi
                    </Link>
                    <Link href="/admin/peminat" className={`${styles.navItem} ${isActive('/admin/peminat') ? styles.active : ''}`}>
                        <Users size={20} /> Pendaftar
                    </Link>
                    <Link href="/admin/pengurus" className={`${styles.navItem} ${isActive('/admin/pengurus') ? styles.active : ''}`}>
                        <Users size={20} /> Struktur Organisasi
                    </Link>
                    <Link href="/admin/pesan" className={`${styles.navItem} ${isActive('/admin/pesan') ? styles.active : ''}`}>
                        <Mail size={20} /> Pesan Masuk
                    </Link>
                    <div className={styles.divider}></div>
                    <Link href="/" className={styles.navItem}>
                        <LogOut size={20} /> Keluar
                    </Link>
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {isSidebarOpen && <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)}></div>}

            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
