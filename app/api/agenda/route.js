import { NextResponse } from 'next/server';
import { getJSONData, saveJSONData } from '@/lib/db';

const FILE_NAME = 'agenda.json';

export async function GET() {
    const data = getJSONData(FILE_NAME);
    // Sort by date ascending
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    return NextResponse.json(data);
}

export async function POST(request) {
    try {
        const newData = await request.json();
        const currentData = getJSONData(FILE_NAME);

        const existingIndex = currentData.findIndex(item => item.id === newData.id);

        if (existingIndex > -1) {
            currentData[existingIndex] = { ...currentData[existingIndex], ...newData };
        } else {
            const entry = { ...newData, id: Date.now() };
            currentData.push(entry);
        }

        saveJSONData(FILE_NAME, currentData);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));

    let data = getJSONData(FILE_NAME);
    data = data.filter(item => item.id !== id);
    saveJSONData(FILE_NAME, data);

    return NextResponse.json({ success: true });
}
