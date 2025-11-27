const xlsx = require('xlsx');

function generateData() {
    const data = [];

    // Headers matching the specific format found earlier
    // id (space), name (space), email, mobail

    for (let i = 1; i <= 500; i++) {
        data.push({
            'id ': i,
            'name ': `User${i} `,
            'email': `user${i}@example.com`,
            'mobail': Math.floor(1000000000 + Math.random() * 9000000000).toString()
        });
    }

    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write to record.csv (which is actually an Excel file)
    xlsx.writeFile(workbook, 'record.csv');
    console.log('Generated 500 records in record.csv');
}

generateData();
