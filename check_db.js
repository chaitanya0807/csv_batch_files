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
    console.log('Rows:', res.rows);
    await client.end();
}

checkData();
