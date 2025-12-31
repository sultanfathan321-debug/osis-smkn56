'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    OSIS SMKN 56
                </Link>

                {/* Desktop Menu */}
                <div className={styles.desktopMenu}>
                    <Link href="/" className={styles.link}>Home</Link>
                    <Link href="/tentang" className={styles.link}>Tentang Kami</Link>
                    <Link href="/agenda" className={styles.link}>Agenda</Link>
                    <Link href="/galeri" className={styles.link}>Galeri</Link>
                    <Link href="/artikel" className={styles.link}>Artikel</Link>
                    <Link href="/kontak" className={styles.link}>Kontak</Link>
                </div>

                {/* Mobile Toggle */}
                <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className={styles.mobileMenu}>
                        <Link href="/" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Home</Link>
                        <Link href="/tentang" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Tentang Kami</Link>
                        <Link href="/agenda" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Agenda</Link>
                        <Link href="/galeri" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Galeri</Link>
                        <Link href="/artikel" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Artikel</Link>
                        <Link href="/kontak" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Kontak</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
