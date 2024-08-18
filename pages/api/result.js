import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'data.json');
    let dataArray = [];

    if (fs.existsSync(filePath)) {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        dataArray = JSON.parse(jsonData);
    }

    res.status(200).json(dataArray);
}
