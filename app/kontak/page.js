'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import styles from './Kontak.module.css';

export default function KontakPage() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const dataRes = await res.json();
            if (res.ok) {
                alert('Pesan berhasil terkirim! Terima kasih atas masukan anda.');
                e.target.reset();
            } else {
                alert('Gagal mengirim pesan: ' + (dataRes.message || 'Error tidak diketahui'));
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
                <h1>Hubungi Kami</h1>
                <p>Kami siap mendengar aspirasi, saran, dan pertanyaan Anda</p>
            </header>

            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Contact Info */}
                    <div className={styles.infoSection}>
                        <h2>Informasi Kontak</h2>
                        <p>Jangan ragu untuk menghubungi kami melalui saluran berikut:</p>

                        <div className={styles.infoList}>
                            <div className={styles.infoItem}>
                                <div className={styles.iconBox}><MapPin size={24} /></div>
                                <div>
                                    <h3>Alamat</h3>
                                    <p>Jl. Pluit Timur Raya No.1, Jakarta Utara</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <div className={styles.iconBox}><Mail size={24} /></div>
                                <div>
                                    <h3>Email</h3>
                                    <p>osis@smkn56jkt.sch.id</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <div className={styles.iconBox}><Phone size={24} /></div>
                                <div>
                                    <h3>Telepon</h3>
                                    <p>(021) 6695555</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className={styles.mapBox}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.038590635293!2d106.79124431476865!3d-6.125586995564883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1df0f44357df%3A0x889d4432130325d7!2sSMK%20Negeri%2056%20Jakarta!5e0!3m2!1sen!2sid!4v1677834567890!5m2!1sen!2sid"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>

                    {/* Form */}
                    <div className={styles.formSection}>
                        <h2>Kirim Pesan / Aspirasi</h2>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label>Nama Lengkap</label>
                                <input name="nama" type="text" placeholder="Masukkan nama anda" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email</label>
                                <input name="email" type="email" placeholder="email@contoh.com" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Pesan / Aspirasi</label>
                                <textarea name="pesan" rows="5" placeholder="Tuliskan pesan anda disini..." required></textarea>
                            </div>
                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                {loading ? 'Mengirim...' : 'Kirim Pesan'} <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
