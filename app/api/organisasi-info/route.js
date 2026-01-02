import { NextResponse } from 'next/server';
import getMongoClient from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const client = await getMongoClient();
        const db = client.db('osis_db');
        const info = await db.collection('organisasi_info').findOne({ type: 'visi_misi' });

        // Default data if none exists
        const defaultData = {
            type: 'visi_misi',
            visi: "Menjadikan OSIS SMKN 56 Jakarta sebagai organisasi yang aktif, aspiratif, dan kompeten dalam mewujudkan siswa yang berkarakter Pancasila.",
            misi: [
                "Meningkatkan kedisiplinan dan sopan santun siswa.",
                "Menyelenggarakan kegiatan yang mengembangkan minat dan bakat.",
                "Membangun kerjasama yang baik antar warga sekolah.",
                "Mengoptimalkan fungsi media sosial sebagai sarana informasi."
            ]
        };

        return NextResponse.json(info || defaultData);
    } catch (error) {
        console.error("Organisasi Info GET Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const client = await getMongoClient();
        const db = client.db('osis_db');
        const collection = db.collection('organisasi_info');

        const { visi, misi } = body;

        await collection.updateOne(
            { type: 'visi_misi' },
            { $set: { visi, misi, updatedAt: new Date() } },
            { upsert: true }
        );

        return NextResponse.json({ success: true, message: 'Info Organisasi berhasil diperbarui!' });
    } catch (error) {
        console.error("Organisasi Info POST Error:", error);
        return NextResponse.json({ success: false, message: 'Gagal memperbarui data.' }, { status: 500 });
    }
}
