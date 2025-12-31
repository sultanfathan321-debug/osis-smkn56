import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>

                    {/* Brand Section */}
                    <div className={styles.brand}>
                        <h3>OSIS SMKN 56</h3>
                        <p>Mewujudkan Generasi Emas yang Aktif, Kreatif, dan Berprestasi.</p>
                        <div className={styles.socials}>
                            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.links}>
                        <h4>Menu Cepat</h4>
                        <ul>
                            <li><Link href="/tentang">Tentang Kami</Link></li>
                            <li><Link href="/agenda">Agenda Kegiatan</Link></li>
                            <li><Link href="/galeri">Galeri Foto</Link></li>
                            <li><Link href="/artikel">Berita Terbaru</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className={styles.contact}>
                        <h4>Hubungi Kami</h4>
                        <ul>
                            <li>
                                <MapPin size={18} />
                                <span>Jl. Pluit Timur Raya No.1, Jakarta Utara</span>
                            </li>
                            <li>
                                <Mail size={18} />
                                <span>osis@smkn56jkt.sch.id</span>
                            </li>
                            <li>
                                <Phone size={18} />
                                <span>(021) 6695555</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className={styles.copyright}>
                    <p>&copy; {new Date().getFullYear()} OSIS SMKN 56 JAKARTA. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
