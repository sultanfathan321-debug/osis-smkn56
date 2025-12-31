import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('osis_db');
        const members = await db.collection('members').find({}).toArray();
        return NextResponse.json(members);
    } catch (error) {
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const client = await clientPromise;
        const db = client.db('osis_db');

        const newEntry = {
            id: Date.now(),
            ...data
        };

        await db.collection('members').insertOne(newEntry);

        return NextResponse.json({ success: true, message: 'Data berhasil ditambahkan!' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Gagal menyimpan data.' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });

        const client = await clientPromise;
        const db = client.db('osis_db');

        // Handle both string and number IDs potentially
        await db.collection('members').deleteOne({ id: Number(id) });

        return NextResponse.json({ success: true, message: 'Data berhasil dihapus!' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Gagal menghapus data.' }, { status: 500 });
    }
}
