import { NextResponse } from 'next/server';
import { getJSONData, saveJSONData } from '@/lib/db';

const FILE_NAME = 'organisasi.json';

export async function GET() {
    const data = getJSONData(FILE_NAME);
    return NextResponse.json(data);
}

export async function POST(request) {
    try {
        const data = await request.json();
        const currentData = getJSONData(FILE_NAME);

        const newEntry = {
            id: Date.now(),
            ...data
        };

        // Add to beginning of list
        const updatedData = [newEntry, ...currentData];
        saveJSONData(FILE_NAME, updatedData);

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

        let currentData = getJSONData(FILE_NAME);
        currentData = currentData.filter(item => item.id != id);
        saveJSONData(FILE_NAME, currentData);

        return NextResponse.json({ success: true, message: 'Data berhasil dihapus!' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Gagal menghapus data.' }, { status: 500 });
    }
}
