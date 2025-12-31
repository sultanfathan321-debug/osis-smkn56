'use client';

import { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import styles from '../Dashboard.module.css';

export default function AdminStatsPage() {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch('/api/stats')
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            });
    }, []);

    const handleChange = (index, field, value) => {
        const newStats = [...stats];
        newStats[index][field] = value;
        setStats(newStats);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        await fetch('/api/stats', {
            method: 'POST',
            body: JSON.stringify(stats)
        });
        setSaving(false);
        alert('Data statistik berhasil disimpan!');
    };

    if (loading) return <p>Memuat data...</p>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Kelola Statistik</h1>
                <p>Edit angka yang muncul di halaman depan</p>
            </header>

            <form onSubmit={handleSubmit} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {stats.map((stat, index) => (
                    <div key={stat.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                        <h3 style={{ marginBottom: '1rem', color: stat.color }}>Kartu {index + 1}: {stat.label}</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label>Label Judul</label>
                                <input
                                    type="text"
                                    value={stat.label}
                                    onChange={(e) => handleChange(index, 'label', e.target.value)}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label>Angka / Nilai</label>
                                <input
                                    type="text"
                                    value={stat.value}
                                    onChange={(e) => handleChange(index, 'value', e.target.value)}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: '1 / -1' }}>
                                <label>Deskripsi Singkat</label>
                                <input
                                    type="text"
                                    value={stat.description}
                                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={saving}
                    style={{
                        background: 'var(--primary)', color: 'white', padding: '1rem',
                        borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1
                    }}
                >
                    {saving ? 'Menyimpan...' : 'Simpan Perubahan'} <Save size={20} />
                </button>
            </form>
        </div>
    );
}
