import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// Default divisions if DB is empty
const DEFAULT_DIVISIONS = [
    "Inti",
    "Sekbid 1: Keagamaan dan Budi Pekerti Luhur",
    "Sekbid 2: Organisasi dan Olahraga",
    "Sekbid 3: Kewirausahaan",
    "Sekbid 4: Hubungan Masyarakat",
    "Sekbid 5: Bela Negara dan Kehidupan Berbangsa",
    "Sekbid 6: Sastra dan Bahasa",
    "Sekbid 7: Media Publikasi"
];

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('osis_db');
        const result = await db.collection('settings').findOne({ type: 'divisions' });

        if (!result || !result.items) {
            return NextResponse.json(DEFAULT_DIVISIONS);
        }
        return NextResponse.json(result.items);
    } catch (error) {
        return NextResponse.json(DEFAULT_DIVISIONS);
    }
}

export async function POST(request) {
    try {
        const data = await request.json(); // Expects array of strings
        const client = await clientPromise;
        const db = client.db('osis_db');

        // Upsert the divisions setting
        await db.collection('settings').updateOne(
            { type: 'divisions' },
            { $set: { type: 'divisions', items: data } },
            { upsert: true }
        );

        return NextResponse.json({ success: true, message: 'Structure updated' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to update' }, { status: 500 });
    }
}
