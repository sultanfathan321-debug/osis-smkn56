import { NextResponse } from 'next/server';
import getMongoClient from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

const defaultJurusan = [
    { name: 'Rekayasa Perangkat Lunak', code: 'RPL' },
    { name: 'Teknik Komputer & Jaringan', code: 'TKJ' },
    { name: 'Multimedia', code: 'MM' },
    { name: 'Desain Komunikasi Visual', code: 'DKV' },
    { name: 'Otomatisasi Tata Kelola Perkantoran', code: 'OTKP' }
];

export async function GET() {
    try {
        const client = await getMongoClient();
        const db = client.db('osis_db');
        const items = await db.collection('jurusan').find({}).toArray();

        if (items.length === 0) {
            return NextResponse.json(defaultJurusan);
        }

        return NextResponse.json(items);
    } catch (error) {
        console.error("Jurusan GET Error:", error);
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const client = await getMongoClient();
        const db = client.db('osis_db');
        const collection = db.collection('jurusan');

        const { id, name, code } = body;

        if (id) {
            // Update
            const { id: _id, ...updateData } = body;
            await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { ...updateData, updatedAt: new Date() } }
            );
            return NextResponse.json({ success: true, message: 'Jurusan berhasil diupdate' });
        } else {
            // Create
            const result = await collection.insertOne({
                name,
                code,
                createdAt: new Date()
            });
            return NextResponse.json({ success: true, id: result.insertedId });
        }
    } catch (error) {
        console.error("Jurusan POST Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        const client = await getMongoClient();
        const db = client.db('osis_db');
        await db.collection('jurusan').deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Jurusan DELETE Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
