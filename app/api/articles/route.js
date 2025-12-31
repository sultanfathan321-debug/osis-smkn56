import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const client = await clientPromise;
        const db = client.db('osis_db');
        const collection = db.collection('articles');

        if (id) {
            // Find specific article by numeric ID (stored as number in JSON, let's keep it consistent)
            // Or usually Mongo uses _id (ObjectId). 
            // To minimize frontend breakage, we'll try to match 'id' field if we migrated data, 
            // but for new data we might default to _id.
            // Let's assume we stick to our custom 'id' field for now for existing frontend compatibility.
            const article = await collection.findOne({ id: Number(id) });
            if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
            return NextResponse.json(article);
        }

        // Default: Get all articles sorted by date (newest first)
        const articles = await collection.find({}).sort({ date: -1 }).toArray();
        return NextResponse.json(articles);
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const newData = await request.json();
        const client = await clientPromise;
        const db = client.db('osis_db');
        const collection = db.collection('articles');

        // Check if updating existing
        if (newData.id) {
            const existing = await collection.findOne({ id: newData.id });
            if (existing) {
                await collection.updateOne({ id: newData.id }, { $set: newData });
                return NextResponse.json({ success: true });
            }
        }

        // Create new
        const entry = {
            ...newData,
            id: Date.now(), // Keep using timestamp as ID for simple Frontend compatibility
            createdAt: new Date()
        };

        await collection.insertOne(entry);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = Number(searchParams.get('id'));

        const client = await clientPromise;
        const db = client.db('osis_db');

        await db.collection('articles').deleteOne({ id: id });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
