const csv = require("csvtojson/v2");
const { writeFile } = require('fs');
const prompt = require('prompt-sync')();

// Prompts user for csv file name.
const userPrompt = () => prompt('Name of file: ');

// Converts CSV to array of JSON objects.
const convertCSV = (fileName) => csv().fromFile(`./${fileName}.csv`);

// Stores JSON array as file locally.
const storeJSON = (fileName, data) => {
    const path = `./${fileName}-output.json`;
    const callback = (error) => {
        if (error) {
            console.log('Error: ', error);
        } else {
            console.log('Data stored as json file.');
        }
      };

    writeFile(path, JSON.stringify(data, null, 2), (error) => callback(error));
};

const main = async () => {
    let fileName = userPrompt();
    fileName = fileName.split('.')[0];
    try {
        const data = await convertCSV(fileName);
        storeJSON(fileName, data);
    } catch (e) {
        throw new Error(`File '${fileName}.csv' does not exist in this directory.`);
    }
};

main();