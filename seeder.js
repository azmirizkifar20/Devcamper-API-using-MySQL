const fs = require('fs');
const colors = require('colors');
const slugify = require('slugify');
const mysqlModel = require('mysql-model');

// connect to DB
const AppModel = mysqlModel.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chevalier-api'
});
const Bootcamp = AppModel.extend({
    tableName: 'bootcamp'
});
const bootcamp = new Bootcamp();

// read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

// import into DB
const importData = async () => {
    try {
        bootcamps.forEach(async (data, index) => {
            // generate slug & custom photo
            data.slug = slugify(data.name, { lower: true });
            data.photo = 'no-photo.jpg';

            const bootcamp = await new Bootcamp(data);
            bootcamp.save();
        });
        console.log('Data imported...'.green.inverse);
    } catch (err) {
        console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
        bootcamp.query('TRUNCATE TABLE bootcamp', () => {
            process.exit();
        });
        console.log('Data deleted...'.red.inverse);
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
