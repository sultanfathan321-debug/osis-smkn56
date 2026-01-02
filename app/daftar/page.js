'use client';

import { useState } from 'react';
import { Send, User, BookOpen, PenTool } from 'lucide-react';
import styles from './Daftar.module.css';

export default function DaftarPage() {
    const [loading, setLoading] = useState(false);
    const [jurusan, setJurusan] = useState([]);
    const [loadingJurusan, setLoadingJurusan] = useState(true);

    useEffect(() => {
        fetch('/api/jurusan')
            .then(res => res.json())
            .then(data => {
                setJurusan(Array.isArray(data) ? data : []);
                setLoadingJurusan(false);
            })
            .catch(err => {
                console.error("Failed to load jurusan", err);
                setLoadingJurusan(false);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const dataRes = await res.json();
            if (res.ok) {
                alert('Pendaftaran berhasil! Kami akan menghubungi anda segera.');
                e.target.reset();
            } else {
                alert('Gagal mendaftar: ' + (dataRes.message || 'Error tidak diketahui'));
            }
        } catch (error) {
            alert('Terjadi kesalahan. Periksa koneksi internet anda.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1>Pendaftaran Anggota Baru</h1>
                <p>Bergabunglah bersama kami untuk memajukan SMKN 56 Jakarta</p>
            </header>

            <div className={styles.container}>
                <div className={styles.formCard}>
                    <div className={styles.formHeader}>
                        <h2>Formulir Pendaftaran</h2>
                        <p>Isi data diri anda dengan benar</p>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.grid}>
                            <div className={styles.formGroup}>
                                <label><User size={16} /> Nama Lengkap</label>
                                <input name="nama" type="text" placeholder="Masukkan nama lengkap" required />
                            </div>

                            <div className={styles.formGroup}>
                                <label><BookOpen size={16} /> Kelas / Jurusan</label>
                                <select name="jurusan" required disabled={loadingJurusan}>
                                    <option value="">{loadingJurusan ? 'Memuat Jurusan...' : 'Pilih Jurusan'}</option>
                                    {jurusan.map((j, idx) => (
                                        <option key={j._id || idx} value={j.code}>
                                            {j.name} ({j.code})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.formGroup}>
                                <label>Nomor WhatsApp</label>
                                <input name="whatsapp" type="tel" placeholder="08xxxxxxxxxx" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email Sekolah</label>
                                <input name="email" type="email" placeholder="nama@smkn56jkt.sch.id" required />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label><PenTool size={16} /> Alasan Bergabung</label>
                            <textarea name="alasan" rows="4" placeholder="Jelaskan motivasi anda bergabung dengan OSIS..." required></textarea>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Pengalaman Organisasi (Opsional)</label>
                            <textarea name="pengalaman" rows="3" placeholder="Sebutkan pengalaman organisasi sebelumnya jika ada..."></textarea>
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Mengirim...' : 'Kirim Pendaftaran'} <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
