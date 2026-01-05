'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Filter } from 'lucide-react';
import styles from './Agenda.module.css';

export default function AgendaPage() {
    const [filter, setFilter] = useState('Semua');
    const [allEvents, setAllEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Helper function to check if content is new (within 7 days)
    const isNew = (createdAt) => {
        if (!createdAt) return false;
        const created = new Date(createdAt);
        const now = new Date();
        const diffTime = Math.abs(now - created);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    };

    useEffect(() => {
        fetch('/api/agenda')
            .then(res => res.json())
            .then(data => {
                setAllEvents(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load agenda", err);
                setLoading(false);
            });
    }, []);

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

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted-foreground)' }}>
                        Memuat agenda...
                    </div>
                ) : (
                    <div className={styles.timeline}>
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event) => (
                                <div key={event.id} className={styles.eventCard}>
                                    {isNew(event.createdAt) && (
                                        <span className={styles.newBadge}>NEW</span>
                                    )}
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
                )}
            </div>
        </main>
    );
}
