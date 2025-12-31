'use client';

import { Plus, Edit, Trash2 } from 'lucide-react';
import styles from '../Dashboard.module.css';

export default function AdminArtikelPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>Manajemen Artikel</h1>
                    <p>Tulis dan kelola berita atau artikel sekolah</p>
                </div>
                <button style={{
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem 1.2rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '600'
                }}>
                    <Plus size={18} /> Tulis Artikel
                </button>
            </header>

            <div className={styles.recentSection} style={{ marginTop: '2rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid var(--border)' }}>
                            <th style={{ padding: '1rem' }}>Judul Artikel</th>
                            <th style={{ padding: '1rem' }}>Penulis</th>
                            <th style={{ padding: '1rem' }}>Kategori</th>
                            <th style={{ padding: '1rem' }}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { id: 1, title: 'Sukses Gelar LDKS 2024', author: 'Admin', category: 'Kegiatan' },
                            { id: 2, title: 'Tips Mengatur Waktu', author: 'Divisi Pendidikan', category: 'Edukasi' },
                            { id: 3, title: 'Juara Umum Futsal', author: 'Divisi Olahraga', category: 'Prestasi' },
                        ].map((item) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>{item.title}</td>
                                <td style={{ padding: '1rem', color: 'var(--muted-foreground)' }}>{item.author}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '50px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        background: '#f1f5f9',
                                        color: 'var(--foreground)'
                                    }}>
                                        {item.category}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                    <button style={{ background: 'none', border: '1px solid var(--border)', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', color: 'var(--primary)' }}>
                                        <Edit size={16} />
                                    </button>
                                    <button style={{ background: 'none', border: '1px solid #fee2e2', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', color: '#dc2626' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
