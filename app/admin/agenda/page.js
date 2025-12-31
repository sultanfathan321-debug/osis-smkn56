'use client';

import { Plus, Edit, Trash2 } from 'lucide-react';
import styles from '../Dashboard.module.css'; // Reusing dashboard styles for consistency

export default function AdminAgendaPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>Manajemen Agenda</h1>
                    <p>Tambah, edit, atau hapus agenda kegiatan</p>
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
                    <Plus size={18} /> Tambah Agenda
                </button>
            </header>

            <div className={styles.recentSection} style={{ marginTop: '2rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid var(--border)' }}>
                            <th style={{ padding: '1rem' }}>Judul Kegiatan</th>
                            <th style={{ padding: '1rem' }}>Tanggal</th>
                            <th style={{ padding: '1rem' }}>Tipe</th>
                            <th style={{ padding: '1rem' }}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { id: 1, title: 'LDKS 2024', date: '2024-08-15', type: 'Event' },
                            { id: 2, title: 'Rapat Pleno', date: '2024-09-01', type: 'Rapat' },
                            { id: 3, title: 'Class Meeting', date: '2024-12-10', type: 'Lomba' },
                        ].map((item) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>{item.title}</td>
                                <td style={{ padding: '1rem', color: 'var(--muted-foreground)' }}>{item.date}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '50px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        background: item.type === 'Rapat' ? '#fee2e2' : item.type === 'Event' ? '#dbeafe' : '#fef3c7',
                                        color: item.type === 'Rapat' ? '#dc2626' : item.type === 'Event' ? '#2563eb' : '#d97706'
                                    }}>
                                        {item.type}
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
