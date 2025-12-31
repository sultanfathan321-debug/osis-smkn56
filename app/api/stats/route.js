import { NextResponse } from 'next/server';
import { getJSONData, saveJSONData } from '@/lib/db';

const FILE_NAME = 'stats.json';

export async function GET() {
    const data = getJSONData(FILE_NAME);
    return NextResponse.json(data);
}

export async function POST(request) {
    try {
        const newData = await request.json();
        saveJSONData(FILE_NAME, newData);
        return NextResponse.json({ success: true, message: 'Statistik berhasil diperbarui!' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Gagal menyimpan data.' }, { status: 500 });
    }
}
