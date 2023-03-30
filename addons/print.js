const Table = require('as-table');
const Colors = require('colors');

const tableConfig = {
    delimiter: '  ▏ '.blue,
    dash: '⎯'.blue,
    left: true,
    title: x => x.white,
    print: x => (typeof x === 'number') ? String(x).blue : String(x)
};

module.exports = {
    table(date) {
        if (date.length > 0) {
            console.log(`\n${Table.configure(tableConfig)(date)}\n`);
        } else {
            console.log('\nThere is nothing!\nTry again.\n'.red);
        }
    }
}