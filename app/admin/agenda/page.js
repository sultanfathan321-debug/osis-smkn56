'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import styles from '../Dashboard.module.css';

export default function AdminAgendaPage() {
    const [agenda, setAgenda] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ id: null, title: '', date: '', type: 'Event', location: '' });

    const fetchAgenda = () => {
        setLoading(true);
        fetch('/api/agenda')
            .then(res => res.json())
            .then(data => {
                setAgenda(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    };

    useEffect(() => {
        fetchAgenda();
    }, []);

    const resetForm = () => {
        setFormData({ id: null, title: '', date: '', type: 'Event', location: '' });
        setIsFormOpen(false);
    };

    const handleEdit = (item) => {
        setFormData(item);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Hapus agenda ini?')) {
            await fetch(`/api/agenda?id=${id}`, { method: 'DELETE' });
            fetchAgenda();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/api/agenda', {
            method: 'POST',
            body: JSON.stringify(formData)
        });
        resetForm();
        fetchAgenda();
    };

    return (
        <div className={styles.container}>
            <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>Manajemen Agenda</h1>
                    <p>Tambah, edit, atau hapus agenda kegiatan</p>
                </div>
                {!isFormOpen && (
                    <button
                        onClick={() => setIsFormOpen(true)}
                        style={{
                            background: 'var(--primary)', color: 'white', border: 'none',
                            padding: '0.8rem 1.2rem', borderRadius: '8px',
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            cursor: 'pointer', fontWeight: '600',
                            position: 'relative', zIndex: 1
                        }}>
                        <Plus size={18} /> Tambah Agenda
                    </button>
                )}
            </header>

            {isFormOpen && (
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', marginTop: '2rem', border: '1px solid var(--border)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>{formData.id ? 'Edit Agenda' : 'Agenda Baru'}</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            placeholder="Nama Kegiatan"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                            required
                        />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                required
                            />
                            <select
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                            >
                                <option>Event</option>
                                <option>Rapat</option>
                                <option>Lomba</option>
                                <option>Libur</option>
                            </select>
                        </div>
                        <input
                            placeholder="Lokasi (Opsional)"
                            value={formData.location}
                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                        />
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button type="button" onClick={resetForm} style={{ padding: '0.8rem 1.5rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>Batal</button>
                            <button type="submit" style={{ padding: '0.8rem 1.5rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Simpan Agenda</button>
                        </div>
                    </form>
                </div>
            )}

            <div className={styles.recentSection} style={{ marginTop: '2rem' }}>
                {loading ? <p>Memuat...</p> : (
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
                            {agenda.map((item) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem', fontWeight: '500' }}>
                                        {item.title}
                                        {item.location && <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>{item.location}</div>}
                                    </td>
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
                                        <button onClick={() => handleEdit(item)} style={{ background: 'none', border: '1px solid var(--border)', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', color: 'var(--primary)' }}>
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: '1px solid #fee2e2', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', color: '#dc2626' }}>
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
