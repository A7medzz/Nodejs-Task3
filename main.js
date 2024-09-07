const readline = require('readline');
const fs = require('fs').promises;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function get_input(question){
    return new Promise((resolve) => {
        const is_valid = () => {
            rl.question(question,(input) => {
                const trimmedinput = input.trim();
                if(trimmedinput.length > 0) {
                    resolve(trimmedinput);
                } 
                else {
                    console.log('Please enter a valid input.');
                    is_valid();
                }
            });
        };
        is_valid();
    });
}

function writefilewiththen(input){
    fs.appendFile('user_data.txt', input + '\n')
    .then(() => {
        console.log('Data has been written to the file (.then).');
    })
    .catch((err) => {
        console.error('error writing to the file (.then): ',err);
    });
}

async function writeFileWithAsync(input) {
    try {
        await fs.appendFile('user_data.txt',input+'\n');
        console.log('Data has been written to the file (async/await).');
    }
    catch (err){
        console.error('error writing to the file (async/await).: ',err);
    }
}

async function main() {
    let input;
    input = await get_input('Please enter your any input: ');
    let choice;
    do{
        choice = await get_input('Choose writing method (1 for .then(), 2 for async/await): ');
        if (choice !== '1' && choice !== '2') console.log('Invalid choice. Please enter 1 or 2.');
    } 
    while (choice !== '1' && choice !== '2');
    if (choice === '1') writefilewiththen(input);
    else if(choice === '2') await writeFileWithAsync(input);
    rl.close();
}

main();