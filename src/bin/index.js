#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");

const BUILDFEAT_PACKAGE = "BUILDFEAT - ";
const BUILDFEAT_VERSION = "2022.5.5";
const BUILDFEAT = BUILDFEAT_PACKAGE + BUILDFEAT_VERSION;

const intro = chalk.white.bold(BUILDFEAT);

const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "#E43962",
    backgroundColor: "#E43939"
};

const MsgBox = boxen(intro, boxenOptions);
console.log(MsgBox);

const options = yargs
    .usage("Usage: -n <name>")
    .option("n", {alias: "name", describe: "Your Name.", type: "string". demandOption=true})
    .argv;

const greet = `hello, ${options.name}`;

console.log(greet)