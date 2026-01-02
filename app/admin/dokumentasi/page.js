'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import styles from '../Dashboard.module.css';

export default function AdminDokumentasiPage() {
    const [docs, setDocs] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ id: null, title: '', category: 'Event', image: '' });

    // Fetch Dokumentasi
    const fetchDocs = () => {
        setLoading(true);
        fetch('/api/dokumentasi')
            .then(res => res.json())
            .then(data => {
                setDocs(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    };

    useEffect(() => {
        fetchDocs();
    }, []);

    const resetForm = () => {
        setFormData({ id: null, title: '', category: 'Event', image: '' });
        setIsFormOpen(false);
    };

    const handleEdit = (item) => {
        setFormData({
            id: item._id,
            title: item.title,
            category: item.category,
            image: item.image
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Hapus dokumentasi ini?')) {
            await fetch(`/api/dokumentasi?id=${id}`, { method: 'DELETE' });
            fetchDocs();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/dokumentasi', {
            method: 'POST',
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            resetForm();
            fetchDocs();
        } else {
            alert("Gagal menyimpan dokumentasi.");
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) { // 2MB Limit
            alert("Ukuran file maksimal 2MB");
            return;
        }

        const reader = new FileReader();
        reader.onload = (ev) => {
            // Basic resizing logic to save DB space
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 1000; // Profile for gallery is larger than artikel but still optimized
                let width = img.width;
                let height = img.height;

                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                setFormData(prev => ({ ...prev, image: canvas.toDataURL('image/jpeg', 0.8) }));
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1>Manajemen Dokumentasi</h1>
                    <p>Kelola foto galeri kegiatan OSIS</p>
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
                        <Plus size={18} /> Tambah Foto
                    </button>
                )}
            </header>

            {isFormOpen && (
                <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', marginTop: '2rem', border: '1px solid var(--border)' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>{formData.id ? 'Edit Dokumentasi' : 'Tambah Dokumentasi Baru'}</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <div style={{ flex: 2, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>Judul Dokumentasi</label>
                                <input
                                    placeholder="Contoh: Rapat Kerja OSIS 2024"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                                    required
                                />
                            </div>
                            <div style={{ flex: 1, minWidth: '150px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>Kategori</label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                                >
                                    <option>Event</option>
                                    <option>Rapat</option>
                                    <option>Lomba</option>
                                    <option>Sosial</option>
                                </select>
                            </div>
                        </div>

                        {/* Image Upload Area */}
                        <div style={{ border: '2px dashed var(--border)', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                                required={!formData.image}
                            />
                            <label htmlFor="fileInput" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                <ImageIcon size={40} color="var(--muted-foreground)" />
                                <span style={{ fontWeight: '500' }}>Klik untuk upload foto</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>Format JPG/PNG, Maks. 2MB</span>
                            </label>

                            {formData.image && (
                                <div style={{ marginTop: '1.5rem', position: 'relative', display: 'inline-block' }}>
                                    <img src={formData.image} alt="Preview" style={{ maxHeight: '200px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                        style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                            <button type="button" onClick={resetForm} style={{ padding: '0.8rem 1.5rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>Batal</button>
                            <button type="submit" style={{ padding: '0.8rem 1.5rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Simpan Dokumentasi</button>
                        </div>
                    </form>
                </div>
            )}

            <div className={styles.recentSection} style={{ marginTop: '2rem' }}>
                {loading ? <p>Memuat data...</p> : (
                    <div className={styles.tableContainer}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                                    <th style={{ padding: '1rem' }}>Foto</th>
                                    <th style={{ padding: '1rem' }}>Judul Dokumentasi</th>
                                    <th style={{ padding: '1rem' }}>Kategori</th>
                                    <th style={{ padding: '1rem' }}>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {docs.length === 0 ? (
                                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted-foreground)' }}>Belum ada dokumentasi.</td></tr>
                                ) : docs.map((item) => (
                                    <tr key={item._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <img src={item.image} alt={item.title} style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                        </td>
                                        <td style={{ padding: '1rem', fontWeight: '500' }}>{item.title}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '50px',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                background: 'var(--muted)',
                                                color: 'var(--foreground)'
                                            }}>
                                                {item.category}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => handleEdit(item)} style={{ background: 'none', border: '1px solid var(--border)', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', color: 'var(--primary)' }}>
                                                <Edit size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(item._id)} style={{ background: 'none', border: '1px solid #fee2e2', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', color: '#dc2626' }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
