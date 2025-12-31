'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import styles from '../Dashboard.module.css';

export default function AdminArtikelPage() {
    const [articles, setArticles] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ id: null, title: '', author: 'Admin', category: 'Kegiatan', content: '', image: '' });

    // Fetch Articles
    const fetchArticles = () => {
        setLoading(true);
        fetch('/api/articles')
            .then(res => res.json())
            .then(data => {
                setArticles(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const resetForm = () => {
        setFormData({ id: null, title: '', author: 'Admin', category: 'Kegiatan', content: '', image: '' });
        setIsFormOpen(false);
    };

    const handleEdit = (item) => {
        setFormData(item);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Hapus artikel ini?')) {
            await fetch(`/api/articles?id=${id}`, { method: 'DELETE' });
            fetchArticles();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/api/articles', {
            method: 'POST',
            body: JSON.stringify(formData)
        });
        resetForm();
        fetchArticles();
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
            // Basic resizing logic
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
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
            <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>Manajemen Artikel</h1>
                    <p>Tulis dan kelola berita atau artikel sekolah</p>
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
                        <Plus size={18} /> Tulis Artikel
                    </button>
                )}
            </header>

            {isFormOpen && (
                <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', marginTop: '2rem', border: '1px solid var(--border)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>{formData.id ? 'Edit Artikel' : 'Artikel Baru'}</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            placeholder="Judul Artikel"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                            required
                        />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                placeholder="Penulis"
                                value={formData.author}
                                onChange={e => setFormData({ ...formData, author: e.target.value })}
                                style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                required
                            />
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                            >
                                <option>Kegiatan</option>
                                <option>Prestasi</option>
                                <option>Edukasi</option>
                                <option>Pengumuman</option>
                            </select>
                        </div>

                        {/* Image Upload */}
                        <div style={{ border: '1px dashed #cbd5e1', padding: '1rem', borderRadius: '8px' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Gambar Utama</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            {formData.image && (
                                <img src={formData.image} alt="Preview" style={{ marginTop: '1rem', height: '150px', borderRadius: '8px', objectFit: 'cover' }} />
                            )}
                        </div>

                        <textarea
                            placeholder="Isi Artikel..."
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', minHeight: '200px', fontFamily: 'inherit' }}
                            required
                        />

                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button type="button" onClick={resetForm} style={{ padding: '0.8rem 1.5rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>Batal</button>
                            <button type="submit" style={{ padding: '0.8rem 1.5rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Simpan Artikel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className={styles.recentSection} style={{ marginTop: '2rem' }}>
                {loading ? <p>Memuat...</p> : (
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
                            {Array.isArray(articles) && articles.map((item) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem', fontWeight: '500' }}>
                                        {item.title}
                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>{item.date}</div>
                                    </td>
                                    <td style={{ padding: '1rem', color: 'var(--muted-foreground)' }}>{item.author}</td>
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
