'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, GraduationCap, X } from 'lucide-react';
import styles from '../Dashboard.module.css';

export default function AdminJurusanPage() {
    const [jurusan, setJurusan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '', code: '' });

    const fetchJurusan = () => {
        setLoading(true);
        fetch('/api/jurusan')
            .then(res => res.json())
            .then(data => {
                setJurusan(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    };

    useEffect(() => {
        fetchJurusan();
    }, []);

    const resetForm = () => {
        setFormData({ id: null, name: '', code: '' });
        setIsFormOpen(false);
    };

    const handleEdit = (item) => {
        setFormData({
            id: item._id,
            name: item.name,
            code: item.code
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (!id) {
            alert("Jurusan default tidak bisa dihapus. Silahkan simpan satu jurusan baru terlebih dahulu untuk menggantikannya.");
            return;
        }
        if (confirm('Hapus jurusan ini?')) {
            await fetch(`/api/jurusan?id=${id}`, { method: 'DELETE' });
            fetchJurusan();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/jurusan', {
            method: 'POST',
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            resetForm();
            fetchJurusan();
        } else {
            alert("Gagal menyimpan jurusan.");
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1>Manajemen Jurusan</h1>
                    <p>Kelola daftar program keahlian yang ada di SMKN 56 Jakarta</p>
                </div>
                {!isFormOpen && (
                    <button
                        onClick={() => setIsFormOpen(true)}
                        style={{
                            background: 'var(--primary)', color: 'white', border: 'none',
                            padding: '0.8rem 1.2rem', borderRadius: '8px',
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            cursor: 'pointer', fontWeight: '600'
                        }}>
                        <Plus size={18} /> Tambah Jurusan
                    </button>
                )}
            </header>

            {isFormOpen && (
                <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', marginTop: '2rem', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3>{formData.id ? 'Edit Jurusan' : 'Tambah Jurusan Baru'}</h3>
                        <button onClick={resetForm} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)' }}>
                            <X size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <div style={{ flex: 2, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>Nama Lengkap Jurusan</label>
                                <input
                                    placeholder="Contoh: Rekayasa Perangkat Lunak"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    style={{
                                        padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1',
                                        fontSize: '1rem', background: 'transparent', color: 'inherit'
                                    }}
                                    required
                                />
                            </div>
                            <div style={{ flex: 1, minWidth: '100px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>Kode Singkat (Abbr.)</label>
                                <input
                                    placeholder="Contoh: RPL"
                                    value={formData.code}
                                    onChange={e => setFormData({ ...formData, code: e.target.value })}
                                    style={{
                                        padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1',
                                        fontSize: '1rem', background: 'transparent', color: 'inherit'
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                            <button type="button" onClick={resetForm} style={{ padding: '0.8rem 1.5rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>Batal</button>
                            <button type="submit" style={{ padding: '0.8rem 1.5rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Simpan Jurusan</button>
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
                                    <th style={{ padding: '1rem' }}>Kode</th>
                                    <th style={{ padding: '1rem' }}>Nama Jurusan</th>
                                    <th style={{ padding: '1rem' }}>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jurusan.length === 0 ? (
                                    <tr><td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted-foreground)' }}>Belum ada data jurusan.</td></tr>
                                ) : jurusan.map((item, index) => (
                                    <tr key={item._id || index} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '50px',
                                                fontSize: '0.85rem',
                                                fontWeight: '700',
                                                background: 'var(--muted)',
                                                color: 'var(--primary)'
                                            }}>
                                                {item.code}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', fontWeight: '500' }}>{item.name}</td>
                                        <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                            {item._id ? (
                                                <>
                                                    <button onClick={() => handleEdit(item)} style={{ background: 'none', border: '1px solid var(--border)', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', color: 'var(--primary)' }}>
                                                        <Edit size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(item._id)} style={{ background: 'none', border: '1px solid #fee2e2', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', color: '#dc2626' }}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </>
                                            ) : (
                                                <span style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', fontStyle: 'italic' }}>Default (Baca Saja)</span>
                                            )}
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
