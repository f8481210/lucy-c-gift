import { promises as fs } from "fs";

const file = "./data.json";

async function readData() {
    try {
        const data = await fs.readFile(file, "utf8");
        return JSON.parse(data);
    } catch {
        return { views: 0, runs: 0, copies: 0 };
    }
}

async function saveData(data) {
    await fs.writeFile(file, JSON.stringify(data));
}

export default async function handler(req, res) {

    let data = await readData();

    const type = req.query.type;

    if (type === "view") data.views++;
    if (type === "run") data.runs++;
    if (type === "copy") data.copies++;

    await saveData(data);

    res.status(200).json(data);
}
