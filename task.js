const { Client } = require('pg');
const xlsx = require('xlsx');

async function importCsvToPostgres() {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'C87g2001@',
        port: 5432,
    });

    await client.connect();

    // Define your table schema accordingly
    await client.query(`
    CREATE TABLE IF NOT EXISTS chaitanyay (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      mobile VARCHAR(255)
    )
  `);

    // Clear existing data
    await client.query('TRUNCATE TABLE chaitanyay RESTART IDENTITY');

    const workbook = xlsx.readFile('record.csv');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    console.log(`Found ${data.length} rows in the file.`);
    if (data.length > 0) {
        console.log('First row keys:', Object.keys(data[0]));
        console.log('First row data:', data[0]);
    }

    for (const row of data) {
        try {
            await client.query(
                'INSERT INTO chaitanyay (name, email, mobile) VALUES ($1, $2, $3)',
                [row['name '], row.email, row.mobail]
            );
        } catch (err) {
            console.error('Error inserting row:', err);
        }
    }

    await client.end();
    console.log('Excel file processed and data inserted to PostgreSQL.');
}

importCsvToPostgres();
