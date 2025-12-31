import { NextResponse } from 'next/server';
import { getJSONData, saveJSONData } from '@/lib/db';

const FILE_NAME = 'divisions.json';

export async function GET() {
    const data = getJSONData(FILE_NAME);
    // Ensure we always have an array even if file is empty/missing
    if (!data || data.length === 0) {
        return NextResponse.json([
            "Inti",
            "Sekbid 1: Keagamaan dan Budi Pekerti Luhur",
            "Sekbid 2: Organisasi dan Olahraga",
            "Sekbid 3: Kewirausahaan",
            "Sekbid 4: Hubungan Masyarakat",
            "Sekbid 5: Bela Negara dan Kehidupan Berbangsa",
            "Sekbid 6: Sastra dan Bahasa",
            "Sekbid 7: Media Publikasi"
        ]);
    }
    return NextResponse.json(data);
}

export async function POST(request) {
    try {
        const data = await request.json(); // Replaces entire list
        saveJSONData(FILE_NAME, data);
        return NextResponse.json({ success: true, message: 'Structure updated' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to update' }, { status: 500 });
    }
}
