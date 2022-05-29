#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");

var fs = require('fs'),
    path = require('path');
const { exit } = require("process");

const BUILDFEAT_PACKAGE = "BUILDFEAT - ";
const BUILDFEAT_VERSION = "2022.5.5";
const BUILDFEAT_SUPPORT_FAMILY = "2022.x";
const BUILDFEAT = BUILDFEAT_PACKAGE + BUILDFEAT_VERSION;

const _FEAT_INTRO = chalk.white.bold(BUILDFEAT);
const _FEAT_NIFT = "A Nift* Project - niftproj.github.io/buildfeat - @Niftproj";

const __BOXEN_OPTIONS = {
    padding: 1,
    borderStyle: "round",
    borderColor: "#E43962",
    backgroundColor: "#E43939"
};

const __BOXEN_OPTIONS_2 = {
    borderStyle: "round",
    borderColor: "#E43962",
};

const __BOXEN_OPTIONS_SUCCESS = {
    borderStyle: "round",
    borderColor: "#00B432",
};

const __BOXEN_OPTIONS_ERROR = {
    borderStyle: "round",
    borderColor: "#ffffff",
};

const __INTRO_BOX = boxen(_FEAT_INTRO, __BOXEN_OPTIONS);
const __INTRO_BOX2 = boxen(_FEAT_NIFT, __BOXEN_OPTIONS_2);
console.log(__INTRO_BOX);
console.log(__INTRO_BOX2);

// accessingFiles: options.scriptName
scriptPath = path.join("./", "build.feat");

function getPath(name) {
    return path.join("./", name);
}

const FeatLang = require('./lib/feat.lang');

const FtL = new FeatLang();
FtL.read(scriptPath);

// fs.readFile(scriptPath, {encoding: 'utf-8'}, (err, data) => {
//     if(!err)
//     {
//         console.log(data);
//     }
//     else
//     {
//         console.error(boxen("File read error: "+err, __BOXEN_OPTIONS_ERROR));
//         exit(-1);
//     }
// })