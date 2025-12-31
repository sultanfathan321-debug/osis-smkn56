import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('osis_db');
        // Get all agenda items, sort by date ascending (oldest to newest for upcoming events)
        // or strictly strictly speaking, user might want newest added? 
        // The original code sorted by date ascending: data.sort((a, b) => new Date(a.date) - new Date(b.date));

        const agenda = await db.collection('agenda').find({}).sort({ date: 1 }).toArray();
        return NextResponse.json(agenda);
    } catch (error) {
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const newData = await request.json();
        const client = await clientPromise;
        const db = client.db('osis_db');
        const collection = db.collection('agenda');

        if (newData.id) {
            const existing = await collection.findOne({ id: newData.id });
            if (existing) {
                await collection.updateOne({ id: newData.id }, { $set: newData });
                return NextResponse.json({ success: true });
            }
        }

        const entry = { ...newData, id: Date.now(), createdAt: new Date() };
        await collection.insertOne(entry);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = Number(searchParams.get('id'));

        const client = await clientPromise;
        const db = client.db('osis_db');
        await db.collection('agenda').deleteOne({ id: id });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
