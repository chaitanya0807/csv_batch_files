const { Client } = require('pg');

async function checkData() {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'C87g2001@',
        port: 5432,
    });

    await client.connect();
    const res = await client.query('SELECT * FROM chaitanyay');
    console.log('Row count:', res.rowCount);
    console.log('First 5 Rows:', res.rows.slice(0, 5));
    await client.end();
}

checkData();
