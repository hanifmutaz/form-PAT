import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { nama, koreksi_dinas, koreksi_diniah, buat_soal, edit_soal, rapor_dinas, rapor_diniah } = req.body;

        const newData = {
            nama,
            koreksi_dinas,
            koreksi_diniah,
            buat_soal,
            edit_soal,
            rapor_dinas,
            rapor_diniah
        };

        const filePath = path.join(process.cwd(), 'data.json');
        let dataArray = [];

        if (fs.existsSync(filePath)) {
            const jsonData = fs.readFileSync(filePath, 'utf8');
            dataArray = JSON.parse(jsonData);
        }

        dataArray.push(newData);

        fs.writeFileSync(filePath, JSON.stringify(dataArray, null, 2), 'utf8');

        res.status(200).json({ message: 'Data has been submitted successfully!' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
