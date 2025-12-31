'use client';

import { useState, useEffect } from 'react';
import { Target, Lightbulb } from 'lucide-react';
import styles from './Tentang.module.css';

const DIVISIONS = [

    "Inti",
    "Sekbid 1: Keagamaan dan Budi Pekerti Luhur",
    "Sekbid 2: Organisasi dan Olahraga",
    "Sekbid 3: Kewirausahaan",
    "Sekbid 4: Hubungan Masyarakat",
    "Sekbid 5: Bela Negara dan Kehidupan Berbangsa",
    "Sekbid 6: Sastra dan Bahasa",
    "Sekbid 7: Media Publikasi"
];

export default function TentangPage() {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetch('/api/organisasi')
            .then(res => res.json())
            .then(data => setMembers(data))
            .catch(err => console.error("Failed to load members", err));
    }, []);

    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Tentang Kami</h1>
                    <p>Mengenal lebih dekat OSIS SMKN 56 Jakarta</p>
                </div>
            </section>

            <div className={styles.container}>
                {/* Visi Misi */}
                <section className={styles.visionMission}>
                    <div className={styles.visionCard}>
                        <div className={styles.iconBox}><Target size={32} /></div>
                        <h2>Visi</h2>
                        <p>"Menjadikan OSIS SMKN 56 Jakarta sebagai organisasi yang aktif, aspiratif, dan kompeten dalam mewujudkan siswa yang berkarakter Pancasila."</p>
                    </div>
                    <div className={styles.visionCard}>
                        <div className={styles.iconBox}><Lightbulb size={32} /></div>
                        <h2>Misi</h2>
                        <ul className={styles.list}>
                            <li>Meningkatkan kedisiplinan dan sopan santun siswa.</li>
                            <li>Menyelenggarakan kegiatan yang mengembangkan minat dan bakat.</li>
                            <li>Membangun kerjasama yang baik antar warga sekolah.</li>
                            <li>Mengoptimalkan fungsi media sosial sebagai sarana informasi.</li>
                        </ul>
                    </div>
                </section>

                {/* Struktur Pengurus Dynamic */}
                <section>
                    {DIVISIONS.map(division => {
                        const divisionMembers = members.filter(m => m.division === division);
                        if (divisionMembers.length === 0) return null;

                        return (
                            <div key={division} className={styles.divisionSection}>
                                <h2 className={styles.divisionTitle}>{division}</h2>
                                <div className={styles.grid}>
                                    {divisionMembers.map(member => (
                                        <div key={member.id} className={styles.card}>
                                            <div className={styles.imageWrapper}>
                                                <span className={styles.badge}>{member.division === 'Inti' ? 'Pengurus Inti' : 'Anggota'}</span>
                                                <img src={member.image} alt={member.name} className={styles.image} />
                                            </div>
                                            <div className={styles.cardContent}>
                                                <h3 className={styles.name}>{member.name}</h3>
                                                <span className={styles.role}>{member.role}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>
        </main>
    );
}
