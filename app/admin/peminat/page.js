'use client';

import { useState, useEffect } from 'react';
import { User, Phone, Mail, BookOpen } from 'lucide-react';
import styles from '../Dashboard.module.css';

export default function AdminPeminatPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/register')
            .then(res => res.json())
            .then(data => {
                setData(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Data Pendaftar Baru</h1>
                <p>List siswa yang mendaftar online</p>
            </header>

            {loading ? (
                <p>Memuat data...</p>
            ) : (
                <div className={styles.recentSection} style={{ marginTop: '2rem' }}>
                    {data.length === 0 ? (
                        <p style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Belum ada pendaftar.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {data.map((item) => (
                                <div key={item.id} style={{
                                    background: 'var(--card-bg)',
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: '1rem'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <User size={20} /> {item.nama}
                                            <span style={{ fontSize: '0.8rem', background: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.6rem', borderRadius: '50px' }}>{item.jurusan}</span>
                                        </h3>
                                        <div style={{ display: 'flex', gap: '1rem', color: 'var(--muted-foreground)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Phone size={14} /> {item.whatsapp}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Mail size={14} /> {item.email}</span>
                                        </div>

                                        <div style={{ background: 'var(--muted)', padding: '1rem', borderRadius: '8px' }}>
                                            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}><strong>Alasan:</strong> {item.alasan}</p>
                                            {item.pengalaman && <p style={{ fontSize: '0.9rem' }}><strong>Pengalaman:</strong> {item.pengalaman}</p>}
                                        </div>
                                    </div>

                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                                        {new Date(item.submittedAt).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
