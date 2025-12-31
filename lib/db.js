import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

export function getJSONData(filename) {
    const filePath = path.join(dataDir, filename);
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');
    try {
        return JSON.parse(fileContent);
    } catch (error) {
        return [];
    }
}

export function saveJSONData(filename, data) {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }
    const filePath = path.join(dataDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
