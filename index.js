// Moonsec API example (private)

/*
 How to use
 1) Configure all variables below (line 21 - line 29)
 2) Make sure you have nodejs installed
 3) Run 'npm install' in your default command line
 4) Put your script in the 'src.lua' file 
 5) Open 'run.bat'
 6) Wait for the obfuscated file to open
*/

// Packages

const fetch = require('node-fetch');
const { readFileSync, writeFileSync } = require('fs');
const { spawn } = require('child_process');

// Endpoint URL

const ENDPOINT = ''; // Put the api endpoint here

// API Variables

const APIKey = ''; // Put your api key here
const AntiTamper = true;
const Options = ''; // Get options from here: https://cmoonm4n.gitbook.io/moonsec-obfuscator/moonsec-rest-api-docs
const Platform = 'roblox'; // Get platform from here: https://cmoonm4n.gitbook.io/moonsec-obfuscator/moonsec-rest-api-docs
const Bytecode = 2; // Get all bytecode options from here: https://cmoonm4n.gitbook.io/moonsec-obfuscator/moonsec-rest-api-docs

// Obfuscation

const src = readFileSync(`${__dirname}\\src.lua`)
let status
fetch(`${ENDPOINT}?key=${APIKey}&antitamper=${AntiTamper}&options=${Options}&bytecode=${Bytecode}&platform=${Platform}`, {
    method: 'post',
    body: src.toString(),
    headers: { "Content-Type": "text" }
})
.then(r => {
    status = r.status
    return r.text()
})
.then(response => {
    if (status !== 200) return console.log(`An error occured (${status}) ${response}`)
    const t = Date.now()
    writeFileSync(__dirname + `\\obfuscated\\obf-${t}.lua`, response)
    console.log('Obfuscated, Opening file!')
    spawn('notepad.exe', [__dirname + `\\obfuscated\\obf-${t}.lua`])
    console.log('Finished!')
})
