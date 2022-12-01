const csv = require("csvtojson/v2");
const { writeFile } = require('fs');
const prompt = require('prompt-sync')();

const userPrompt = () => prompt('Path to file: ');

const convertCSV = (filePath) => csv().fromFile(filePath);

const storeJSON = (data) => {
    const callback = (error) => {
        if (error) {
            console.log('Error: ', error);
        } else {
            console.log('JSON data stored as output.json');
        }
      };

    const path = './output.json';
    writeFile(path, JSON.stringify(data, null, 2), (error) => callback(error));
};

const main = async () => {
    try {
        const filePath = userPrompt();
        const data = await convertCSV(filePath);
        storeJSON(data);
    } catch (e) {
        throw new Error(e);
    }
};

main();