'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock, Filter } from 'lucide-react';
import styles from './Agenda.module.css';

// Mock Data
const allEvents = [
    { id: 1, title: 'LDKS 2024', date: '2024-08-15', time: '07:00', location: 'Puncak', type: 'Event', description: 'Latihan Dasar Kepemimpinan Siswa untuk calon pengurus baru.' },
    { id: 2, title: 'Rapat Pleno', date: '2024-09-01', time: '13:00', location: 'Ruang OSIS', type: 'Rapat', description: 'Evaluasi program kerja bulanan.' },
    { id: 3, title: 'Class Meeting', date: '2024-12-10', time: '08:00', location: 'Lapangan', type: 'Lomba', description: 'Pertandingan olahraga antar kelas.' },
    { id: 4, title: 'Maulid Nabi', date: '2024-10-20', time: '07:30', location: 'Masjid Sekolah', type: 'Event', description: 'Peringatan Maulid Nabi Muhammad SAW.' },
];

export default function AgendaPage() {
    const [filter, setFilter] = useState('Semua');

    const filteredEvents = filter === 'Semua'
        ? allEvents
        : allEvents.filter(e => e.type === filter);

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1>Agenda Kegiatan</h1>
                <p>Jadwal kegiatan OSIS SMKN 56 Jakarta</p>
            </header>

            <div className={styles.container}>
                <div className={styles.filterBar}>
                    <div className={styles.filterIcon}>
                        <Filter size={20} />
                        <span>Filter:</span>
                    </div>
                    {['Semua', 'Rapat', 'Event', 'Lomba'].map((type) => (
                        <button
                            key={type}
                            className={`${styles.filterBtn} ${filter === type ? styles.active : ''}`}
                            onClick={() => setFilter(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className={styles.timeline}>
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <div key={event.id} className={styles.eventCard}>
                                <div className={styles.dateBox}>
                                    <span className={styles.dateDay}>{new Date(event.date).getDate()}</span>
                                    <span className={styles.dateMonth}>
                                        {new Date(event.date).toLocaleString('id-ID', { month: 'short' })}
                                    </span>
                                </div>

                                <div className={styles.eventContent}>
                                    <div className={styles.eventHeader}>
                                        <span className={`${styles.badge} ${styles[event.type.toLowerCase()]}`}>
                                            {event.type}
                                        </span>
                                        <h3>{event.title}</h3>
                                    </div>

                                    <div className={styles.eventDetails}>
                                        <span><Clock size={16} /> {event.time} WIB</span>
                                        <span><MapPin size={16} /> {event.location}</span>
                                    </div>

                                    <p className={styles.description}>{event.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={styles.empty}>Tidak ada agenda ditemukan.</p>
                    )}
                </div>
            </div>
        </main>
    );
}
