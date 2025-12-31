import { NextResponse } from 'next/server';
import getMongoClient from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const data = await request.json();
        const client = await getMongoClient();
        const db = client.db('osis_db');

        const newEntry = {
            id: Date.now(),
            submittedAt: new Date().toISOString(),
            ...data
        };

        await db.collection('registrations').insertOne(newEntry);

        return NextResponse.json({ success: true, message: 'Pendaftaran berhasil!' });
    } catch (error) {
        console.error("REGISTER_POST_ERROR:", error);
        return NextResponse.json({ success: false, message: 'Gagal mendaftar: ' + error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const client = await getMongoClient();
        const db = client.db('osis_db');
        const registrations = await db.collection('registrations').find({}).sort({ submittedAt: -1 }).toArray();
        return NextResponse.json(registrations);
    } catch (error) {
        return NextResponse.json([], { status: 500 });
    }
}
