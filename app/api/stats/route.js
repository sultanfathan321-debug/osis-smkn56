import { NextResponse } from 'next/server';
import getMongoClient from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const client = await getMongoClient();
        const db = client.db('osis_db');
        let stats = await db.collection('stats').find({}).toArray();

        // Return default stats if empty so the section is visible
        if (!stats || stats.length === 0) {
            stats = [
                { id: 1, label: 'Siswa Aktif', value: '1.200+', description: 'Total siswa SMKN 56 Jakarta', iconName: 'Users', color: '#3b82f6' },
                { id: 2, label: 'Kegiatan Tahunan', value: '24+', description: 'Program kerja terlaksana', iconName: 'Calendar', color: '#10b981' },
                { id: 3, label: 'Prestasi Juara', value: '85+', description: 'Penghargaan tingkat kota/nasional', iconName: 'Trophy', color: '#f59e0b' }
            ];
        }

        return NextResponse.json(stats);
    } catch (error) {
        console.error("Stats GET Error:", error);
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request) {
    try {
        const newData = await request.json();
        if (!Array.isArray(newData)) {
            return NextResponse.json({ success: false, message: 'Data harus berupa array.' }, { status: 400 });
        }

        const client = await getMongoClient();
        const db = client.db('osis_db');
        const collection = db.collection('stats');

        // Replace all stats with new data
        await collection.deleteMany({});
        if (newData.length > 0) {
            await collection.insertMany(newData);
        }

        return NextResponse.json({ success: true, message: 'Statistik berhasil diperbarui!' });
    } catch (error) {
        console.error("Stats POST Error:", error);
        return NextResponse.json({ success: false, message: 'Gagal menyimpan data.' }, { status: 500 });
    }
}
