'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Target, Lightbulb } from 'lucide-react';
import styles from '../Dashboard.module.css';

export default function AdminTentangInfoPage() {
    const [data, setData] = useState({ visi: '', misi: [] });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch('/api/organisasi-info')
            .then(res => res.json())
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, []);

    const handleMisiChange = (index, value) => {
        const newMisi = [...data.misi];
        newMisi[index] = value;
        setData({ ...data, misi: newMisi });
    };

    const addMisi = () => {
        setData({ ...data, misi: [...data.misi, ''] });
    };

    const removeMisi = (index) => {
        const newMisi = data.misi.filter((_, i) => i !== index);
        setData({ ...data, misi: newMisi });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const res = await fetch('/api/organisasi-info', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (res.ok) {
            alert('Info Organisasi berhasil disimpan!');
        } else {
            alert('Gagal menyimpan data.');
        }
        setSaving(false);
    };

    if (loading) return <p style={{ padding: '2rem' }}>Memuat data...</p>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Kelola Visi & Misi</h1>
                <p>Sesuaikan arah dan tujuan OSIS SMKN 56 Jakarta</p>
            </header>

            <form onSubmit={handleSubmit} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Visi Section */}
                <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Target size={20} color="var(--primary)" /> Visi Organisasi
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>Paragraf Visi</label>
                        <textarea
                            value={data.visi}
                            onChange={(e) => setData({ ...data, visi: e.target.value })}
                            style={{
                                padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1',
                                fontSize: '1rem', minHeight: '100px', width: '100%',
                                background: 'transparent', color: 'inherit'
                            }}
                            required
                        />
                    </div>
                </div>

                {/* Misi Section */}
                <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Lightbulb size={20} color="#f59e0b" /> Misi Organisasi
                        </h3>
                        <button
                            type="button"
                            onClick={addMisi}
                            style={{
                                background: 'var(--accent)', color: 'white', border: 'none',
                                padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem'
                            }}
                        >
                            <Plus size={16} /> Tambah Poin
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {data.misi.map((item, index) => (
                            <div key={index} style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleMisiChange(index, e.target.value)}
                                    placeholder={`Poin misi ke-${index + 1}`}
                                    style={{
                                        flex: 1, padding: '0.8rem', borderRadius: '8px',
                                        border: '1px solid #cbd5e1', fontSize: '1rem',
                                        background: 'transparent', color: 'inherit'
                                    }}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => removeMisi(index)}
                                    style={{
                                        background: 'none', border: '1px solid #fee2e2',
                                        color: '#dc2626', borderRadius: '8px', padding: '0.5rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    style={{
                        background: 'var(--primary)', color: 'white', padding: '1.2rem',
                        borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1
                    }}
                >
                    {saving ? 'Menyimpan...' : 'Simpan Perubahan'} <Save size={22} />
                </button>
            </form>
        </div>
    );
}
