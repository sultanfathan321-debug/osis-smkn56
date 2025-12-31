'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

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
                    <ThemeToggle />
                </div>

                {/* Mobile Toggle */}
                <div className={styles.mobileControls} style={{ display: 'none', alignItems: 'center', gap: '1rem' }}>
                    <ThemeToggle />
                    <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                {/* Simplified Mobile Logic: Just showing the button next to menu on mobile handled via CSS usually, 
                    but here we'll assume the mobileToggle is only visible on mobile. 
                    I'll add the theme toggle to the mobile menu container as well or next to the hamburger.
                */}
                <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* We can place the toggle inside the menu or next to it. For now, let's put it in the menu list or separate. 
                        Actually, let's just add it to the mobile menu list for simplicity.
                    */}
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
                        <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Ganti Tema</span>
                            <ThemeToggle />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
