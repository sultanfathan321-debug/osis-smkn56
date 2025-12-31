'use client';

import { useState, useEffect } from 'react';
import { Users, Calendar, Trophy, ArrowUpRight } from 'lucide-react';
import styles from './StatsCards.module.css';

const IconMap = {
    'Users': Users,
    'Calendar': Calendar,
    'Trophy': Trophy
};

export default function StatsCards() {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        fetch('/api/stats')
            .then(res => res.json())
            .then(data => setStats(Array.isArray(data) ? data : []))
            .catch(err => {
                console.error("Failed to load stats", err);
                setStats([]);
            });
    }, []);

    if (!Array.isArray(stats) || stats.length === 0) return null;

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {stats.map((stat) => {
                    const IconComponent = IconMap[stat.iconName] || Users;
                    return (
                        <div key={stat.id} className={styles.card}>
                            <div className={styles.iconWrapper} style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                                <IconComponent size={32} />
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.value}>{stat.value}</h3>
                                <p className={styles.label}>{stat.label}</p>
                                <span className={styles.description}>{stat.description}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
