import { NextResponse } from 'next/server';
import { getJSONData, saveJSONData } from '@/lib/db';

const FILE_NAME = 'articles.json';

export async function GET() {
    const data = getJSONData(FILE_NAME);
    return NextResponse.json(data);
}

export async function POST(request) {
    try {
        const newData = await request.json();
        const currentData = getJSONData(FILE_NAME);

        // Check if updating existing
        const existingIndex = currentData.findIndex(item => item.id === newData.id);

        if (existingIndex > -1) {
            currentData[existingIndex] = { ...currentData[existingIndex], ...newData };
        } else {
            const entry = { ...newData, id: Date.now(), date: new Date().toISOString().split('T')[0] };
            currentData.unshift(entry); // Add to top
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
