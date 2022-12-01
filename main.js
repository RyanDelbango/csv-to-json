const csv = require("csvtojson/v2");
const { writeFile } = require('fs');
const prompt = require('prompt-sync')();

const userPrompt = () => prompt('Name of file: ');

const convertCSV = (fileName) => csv().fromFile(`./${fileName}`);

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
        const fileName = userPrompt();
        const data = await convertCSV(fileName);
        storeJSON(data);
    } catch (e) {
        throw new Error(e);
    }
};

main();