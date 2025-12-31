import { NextResponse } from 'next/server';
import { getJSONData, saveJSONData } from '@/lib/db';

const FILE_NAME = 'messages.json';

export async function POST(request) {
    try {
        const data = await request.json();
        const currentData = getJSONData(FILE_NAME);

        const newEntry = {
            id: Date.now(),
            submittedAt: new Date().toISOString(),
            ...data
        };

        currentData.unshift(newEntry);
        saveJSONData(FILE_NAME, currentData);

        return NextResponse.json({ success: true, message: 'Pesan berhasil dikirim!' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Gagal mengirim pesan.' }, { status: 500 });
    }
}

export async function GET() {
    const data = getJSONData(FILE_NAME);
    return NextResponse.json(data);
}
