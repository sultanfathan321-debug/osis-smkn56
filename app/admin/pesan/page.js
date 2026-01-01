'use client';

import { useState, useEffect } from 'react';
import { Mail, User } from 'lucide-react';
import styles from '../Dashboard.module.css';

export default function AdminPesanPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/contact')
            .then(res => res.json())
            .then(data => {
                setData(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1>Pesan Masuk</h1>
                    <p>Aspirasi dan pertanyaan dari pengunjung</p>
                </div>
            </header>

            {loading ? (
                <p>Memuat pesan...</p>
            ) : (
                <div className={styles.recentSection} style={{ marginTop: '2rem' }}>
                    {data.length === 0 ? (
                        <p style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Belum ada pesan masuk.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {data.map((item) => (
                                <div key={item.id} style={{
                                    background: 'var(--card-bg)',
                                    padding: '1.25rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1rem', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <User size={16} /> {item.nama}
                                            </h3>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: '0.3rem', wordBreak: 'break-all' }}>
                                                <Mail size={14} /> {item.email}
                                            </span>
                                        </div>
                                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                            {new Date(item.submittedAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div style={{ background: 'var(--muted)', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                        {item.pesan}
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
