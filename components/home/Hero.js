import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <span className={`${styles.badge} animate-slide-up`}>OSIS SMKN 56 JAKARTA</span>
                <h1 className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    Mewujudkan Organisasi yang <span className={styles.highlight}>Aktif</span> & <span className={styles.highlight}>Transparan</span>
                </h1>
                <p className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    Wadah aspirasi siswa untuk menciptakan lingkungan sekolah yang positif, kreatif, dan berprestasi.
                </p>
                <div className={`${styles.actions} animate-slide-up`} style={{ animationDelay: '0.3s' }}>
                    <Link href="/daftar" className={`${styles.btn} ${styles.btnPrimary}`}>
                        Daftar Anggota <ArrowRight size={20} />
                    </Link>
                    <Link href="/agenda" className={`${styles.btn} ${styles.btnOutline}`}>
                        Lihat Kegiatan
                    </Link>
                </div>
            </div>
        </section>
    );
}
