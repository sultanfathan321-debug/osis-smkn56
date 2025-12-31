'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, User } from 'lucide-react';
import styles from '../Dashboard.module.css';

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

export default function AdminPengurusPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', role: '', division: 'Inti', image: '' });

    const fetchData = () => {
        fetch('/api/organisasi')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/api/organisasi', {
            method: 'POST',
            body: JSON.stringify(formData)
        });
        setIsFormOpen(false);
        setFormData({ name: '', role: '', division: 'Inti', image: '' });
        fetchData();
    };

    const handleDelete = async (id) => {
        if (confirm('Yakin ingin menghapus?')) {
            await fetch(`/api/organisasi?id=${id}`, { method: 'DELETE' });
            fetchData();
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>Struktur Organisasi</h1>
                    <p>Kelola susunan pengurus OSIS</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    style={{
                        background: 'var(--primary)', color: 'white', border: 'none',
                        padding: '0.8rem 1.2rem', borderRadius: '8px',
                        display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
                    }}>
                    <Plus size={18} /> Tambah Pengurus
                </button>
            </header>

            {isFormOpen && (
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid var(--border)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Tambah Pengurus Baru</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                            placeholder="Nama Lengkap"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <input
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                            placeholder="Jabatan (Contoh: Ketua OSIS / Anggota)"
                            value={formData.role}
                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                            required
                        />
                        <select
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                            value={formData.division}
                            onChange={e => setFormData({ ...formData, division: e.target.value })}
                        >
                            {DIVISIONS.map(div => <option key={div} value={div}>{div}</option>)}
                        </select>
                        <input
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                            placeholder="URL Foto (Contoh: https://...)"
                            value={formData.image}
                            onChange={e => setFormData({ ...formData, image: e.target.value })}
                            required
                        />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button type="submit" style={{ padding: '0.8rem 1.5rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Simpan</button>
                            <button type="button" onClick={() => setIsFormOpen(false)} style={{ padding: '0.8rem 1.5rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>Batal</button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? <p>Memuat...</p> : DIVISIONS.map(div => {
                const members = data.filter(d => d.division === div);
                if (members.length === 0) return null;
                return (
                    <div key={div} style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: 'var(--primary)', borderBottom: '2px solid var(--secondary)', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'inline-block' }}>{div}</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                            {members.map(member => (
                                <div key={member.id} style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', position: 'relative' }}>
                                    <img src={member.image} alt={member.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem', background: '#f1f5f9' }} />
                                    <h4 style={{ fontSize: '1rem' }}>{member.name}</h4>
                                    <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{member.role}</p>
                                    <button
                                        onClick={() => handleDelete(member.id)}
                                        style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'white', border: 'none', padding: '0.3rem', borderRadius: '4px', cursor: 'pointer', color: '#ef4444', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
