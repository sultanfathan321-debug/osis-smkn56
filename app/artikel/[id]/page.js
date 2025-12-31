'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ArticleDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch article data here. For now, we'll simluate fetching from the same source as the list page or API.
        // Ideally, we should have an API endpoint like /api/articles/[id]

        const fetchArticle = async () => {
            try {
                const res = await fetch(`/api/articles?id=${params.id}`);
                // Note: The existing /api/articles might return all. 
                // Let's assume we can filter or fetch specific one.
                // If the API isn't set up for single ID, we might need to fetch all and find it.

                const data = await res.json();

                // If API returns array, find the specific one
                if (Array.isArray(data)) {
                    const found = data.find(a => a.id.toString() === params.id);
                    setArticle(found);
                } else {
                    setArticle(data);
                }
            } catch (error) {
                console.error("Failed to fetch article", error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchArticle();
        }
    }, [params.id]);

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--muted)' }}>
            <p>Loading...</p>
        </div>
    );

    if (!article) return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--muted)', gap: '1rem', color: 'var(--foreground)' }}>
            <h1>Artikel Tidak Ditemukan</h1>
            <Link href="/artikel" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Kembali ke Artikel</Link>
        </div>
    );

    return (
        <main style={{ background: 'var(--muted)', minHeight: '100vh', paddingTop: '80px', paddingBottom: '4rem' }}>
            <article style={{
                maxWidth: '800px',
                margin: '0 auto',
                background: 'var(--card-bg)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                border: '1px solid var(--border)'
            }}>
                <div style={{ height: '400px', position: 'relative', overflow: 'hidden' }}>
                    <img
                        src={article.image || 'https://via.placeholder.com/800x400'}
                        alt={article.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                        padding: '2rem',
                        color: 'white'
                    }}>
                        <span style={{
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '50px',
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            display: 'inline-block',
                            marginBottom: '0.5rem'
                        }}>
                            {article.category}
                        </span>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', lineHeight: 1.2 }}>{article.title}</h1>
                        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', opacity: 0.9 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={16} /> {article.date}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <User size={16} /> {article.author}
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{ padding: '3rem 2rem', color: 'var(--foreground)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                    {/* Render content. If it's HTML, use dangerousSetInnerHTML, otherwise just text */}
                    {article.content ? (
                        <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
                    ) : (
                        <p>{article.excerpt} (Konten lengkap belum tersedia di database...)</p>
                    )}
                </div>

                <div style={{ padding: '2rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                    <Link href="/artikel" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        background: 'var(--muted)',
                        borderRadius: '50px',
                        color: 'var(--foreground)',
                        fontWeight: '600',
                        transition: 'all 0.2s'
                    }}>
                        <ArrowLeft size={20} /> Kembali ke Daftar Artikel
                    </Link>
                </div>
            </article>
        </main>
    );
}
