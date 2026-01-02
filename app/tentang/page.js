'use client';

import { useState, useEffect } from 'react';
import { Target, Lightbulb } from 'lucide-react';
import styles from './Tentang.module.css';

export default function TentangPage() {
    const [members, setMembers] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [info, setInfo] = useState({ visi: '', misi: [] });
    const [loadingInfo, setLoadingInfo] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/api/organisasi').then(res => res.json()),
            fetch('/api/divisions').then(res => res.json()),
            fetch('/api/organisasi-info').then(res => res.json())
        ]).then(([orgData, divData, infoData]) => {
            setMembers(Array.isArray(orgData) ? orgData : []);
            setDivisions(Array.isArray(divData) ? divData : []);
            setInfo(infoData);
            setLoadingInfo(false);
        }).catch(err => {
            console.error("Failed to load data", err);
            setMembers([]);
            setDivisions([]);
            setLoadingInfo(false);
        });
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
                {loadingInfo ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted-foreground)' }}>Memuat Info...</div>
                ) : (
                    <section className={styles.visionMission}>
                        <div className={styles.visionCard}>
                            <div className={styles.iconBox}><Target size={32} /></div>
                            <h2>Visi</h2>
                            <p>"{info.visi}"</p>
                        </div>
                        <div className={styles.visionCard}>
                            <div className={styles.iconBox}><Lightbulb size={32} /></div>
                            <h2>Misi</h2>
                            <ul className={styles.list}>
                                {info.misi.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

                {/* Struktur Pengurus Dynamic */}
                <section>
                    {Array.isArray(divisions) && divisions.map(division => {
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
