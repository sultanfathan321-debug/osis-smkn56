'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import styles from '../Dashboard.module.css';

export default function AdminPengurusPage() {
    const [data, setData] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Forms state
    const [isPersonFormOpen, setIsPersonFormOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', role: '', division: '', image: '' });

    // Divisions Management state
    const [isDivManagerOpen, setIsDivManagerOpen] = useState(false);
    const [newDivName, setNewDivName] = useState('');

    const fetchData = async () => {
        setLoading(true);
        const [orgRes, divRes] = await Promise.all([
            fetch('/api/organisasi'),
            fetch('/api/divisions')
        ]);
        const orgData = await orgRes.json();
        const divData = await divRes.json();

        setData(Array.isArray(orgData) ? orgData : []);
        setDivisions(Array.isArray(divData) ? divData : []);
        if (!formData.division && Array.isArray(divData) && divData.length > 0) {
            setFormData(prev => ({ ...prev, division: divData[0] }));
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- Person Actions ---
    const handlePersonSubmit = async (e) => {
        e.preventDefault();
        await fetch('/api/organisasi', {
            method: 'POST',
            body: JSON.stringify(formData)
        });
        setIsPersonFormOpen(false);
        setFormData({ name: '', role: '', division: divisions[0] || 'Inti', image: '' });
        fetchData();
    };

    const handlePersonDelete = async (id) => {
        if (confirm('Yakin ingin menghapus pengurus ini?')) {
            await fetch(`/api/organisasi?id=${id}`, { method: 'DELETE' });
            fetchData();
        }
    };

    // --- Division Actions ---
    const updateDivisions = async (newDivisions) => {
        await fetch('/api/divisions', {
            method: 'POST',
            body: JSON.stringify(newDivisions)
        });
        setDivisions(newDivisions);
    }

    const handleAddDivision = async (e) => {
        e.preventDefault();
        if (!newDivName) return;
        const newDivs = [...divisions, newDivName];
        await updateDivisions(newDivs);
        setNewDivName('');
    };

    const handleDeleteDivision = async (divName) => {
        if (confirm(`Hapus divisi "${divName}"? Pengurus di divisi ini akan tetap ada tapi tidak muncul di kelompok divisi.`)) {
            const newDivs = divisions.filter(d => d !== divName);
            await updateDivisions(newDivs);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1>Struktur Organisasi</h1>
                    <p>Kelola susunan pengurus OSIS & Divisi</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', position: 'relative', zIndex: 1 }}>
                    <button
                        onClick={() => setIsDivManagerOpen(!isDivManagerOpen)}
                        style={{
                            background: 'white', color: 'var(--foreground)', border: '1px solid var(--border)',
                            padding: '0.8rem 1.2rem', borderRadius: '8px',
                            display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
                        }}>
                        <Edit2 size={18} /> Kelola Sekbid/Divisi
                    </button>
                    <button
                        onClick={() => setIsPersonFormOpen(true)}
                        style={{
                            background: 'var(--primary)', color: 'white', border: 'none',
                            padding: '0.8rem 1.2rem', borderRadius: '8px',
                            display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
                        }}>
                        <Plus size={18} /> Tambah Pengurus
                    </button>
                </div>
            </header>

            {/* Division Manager Panel */}
            {isDivManagerOpen && (
                <div style={{ background: 'var(--muted)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid var(--border)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Kelola Daftar Divisi / Sekbid</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                        {divisions.map((div, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
                                <span>{div}</span>
                                <button onClick={() => handleDeleteDivision(div)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleAddDivision} style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            value={newDivName}
                            onChange={(e) => setNewDivName(e.target.value)}
                            placeholder="Nama Divisi / Sekbid Baru..."
                            style={{ flex: 1, padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            required
                        />
                        <button type="submit" style={{ padding: '0.6rem 1rem', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Tambah</button>
                    </form>
                </div>
            )}

            {/* Add Person Form */}
            {isPersonFormOpen && (
                <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid var(--border)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Tambah Pengurus Baru</h3>
                    <form onSubmit={handlePersonSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                            required
                        >
                            <option value="" disabled>Pilih Divisi</option>
                            {divisions.map(div => <option key={div} value={div}>{div}</option>)}
                        </select>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', color: '#64748b' }}>Foto Profil (Max 1MB)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;

                                    if (file.size > 1024 * 1024) {
                                        alert("Ukuran file terlalu besar! Maksimal 1MB.");
                                        e.target.value = "";
                                        return;
                                    }

                                    // Simple Resize & Convert to Base64
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                        const img = new Image();
                                        img.onload = () => {
                                            const canvas = document.createElement('canvas');
                                            let width = img.width;
                                            let height = img.height;

                                            // Resize logic (max 500px)
                                            const MAX_SIZE = 500;
                                            if (width > height) {
                                                if (width > MAX_SIZE) {
                                                    height *= MAX_SIZE / width;
                                                    width = MAX_SIZE;
                                                }
                                            } else {
                                                if (height > MAX_SIZE) {
                                                    width *= MAX_SIZE / height;
                                                    height = MAX_SIZE;
                                                }
                                            }

                                            canvas.width = width;
                                            canvas.height = height;
                                            const ctx = canvas.getContext('2d');
                                            ctx.drawImage(img, 0, 0, width, height);

                                            // Auto compress to JPEG 0.8 quality
                                            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                                            setFormData({ ...formData, image: dataUrl });
                                        };
                                        img.src = event.target.result;
                                    };
                                    reader.readAsDataURL(file);
                                }}
                                style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                required={!formData.image}
                            />
                            {formData.image && (
                                <img src={formData.image} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', marginTop: '0.5rem' }} />
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button type="submit" style={{ padding: '0.8rem 1.5rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Simpan</button>
                            <button type="button" onClick={() => setIsPersonFormOpen(false)} style={{ padding: '0.8rem 1.5rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>Batal</button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            {loading ? <p>Memuat...</p> : divisions.map(div => {
                const members = data.filter(d => d.division === div);
                // Always show the header in admin even if empty, so user knows the division exists
                return (
                    <div key={div} style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: 'var(--primary)', borderBottom: '2px solid var(--secondary)', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'inline-block' }}>{div}</h3>
                        {members.length === 0 ? (
                            <p style={{ fontSize: '0.9rem', color: '#94a3b8', fontStyle: 'italic' }}>Belum ada anggota di divisi ini.</p>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                                {members.map(member => (
                                    <div key={member.id} style={{ background: 'var(--card-bg)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', position: 'relative' }}>
                                        <img src={member.image} alt={member.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem', background: '#f1f5f9' }} />
                                        <h4 style={{ fontSize: '1rem' }}>{member.name}</h4>
                                        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{member.role}</p>
                                        <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', display: 'flex', gap: '0.3rem' }}>
                                            {/* Future: Add Edit button here */}
                                            <button
                                                onClick={() => handlePersonDelete(member.id)}
                                                style={{ background: 'white', border: 'none', padding: '0.3rem', borderRadius: '4px', cursor: 'pointer', color: '#ef4444', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

