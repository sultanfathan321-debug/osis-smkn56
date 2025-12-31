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
                setData(data);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Pesan Masuk</h1>
                <p>Aspirasi dan pertanyaan dari pengunjung</p>
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
                                    background: 'white',
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <User size={18} /> {item.nama}
                                            </h3>
                                            <span style={{ fontSize: '0.9rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                <Mail size={14} /> {item.email}
                                            </span>
                                        </div>
                                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                            {new Date(item.submittedAt).toLocaleDateString()} {new Date(item.submittedAt).toLocaleTimeString()}
                                        </span>
                                    </div>

                                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', fontSize: '0.95rem', lineHeight: '1.6' }}>
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
