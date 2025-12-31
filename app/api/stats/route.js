import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('osis_db');
        const stats = await db.collection('stats').find({}).toArray();
        return NextResponse.json(Array.isArray(stats) ? stats : []);
    } catch (error) {
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request) {
    try {
        const newData = await request.json();
        const client = await clientPromise;
        const db = client.db('osis_db');
        const collection = db.collection('stats');

        // We only need one stats document, so we update the first one found, or insert if empty
        const existing = await collection.findOne({});

        if (existing) {
            await collection.updateOne({ _id: existing._id }, { $set: newData });
        } else {
            await collection.insertOne(newData);
        }

        return NextResponse.json({ success: true, message: 'Statistik berhasil diperbarui!' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Gagal menyimpan data.' }, { status: 500 });
    }
}
