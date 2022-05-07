#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");

var FeatConfigurator = require('./lib/configure');
var FeatMakeSystem = require('./sys/make');

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

const options = yargs
    .usage("Usage: -s <scriptName>")
    .option("s", {alias: "scriptName", describe: "Buildfeat configure script.", type: "string". demandOption=true})
    .argv;

// accessingFiles: options.scriptName
scriptPath = path.join("./", options.scriptName);

function getPath(name) {
    return path.join("./", name);
}

fs.readFile(scriptPath, {encoding: 'utf-8'}, (err, data) => {
    if(!err)
    {
        var conf = new FeatConfigurator(data);
        if(conf.featConfigure.featSupportFamily != BUILDFEAT_SUPPORT_FAMILY)
        {
            console.error(boxen(`No family support, consider installing Buildfeat of supportVersion: ${BUILDFEAT_SUPPORT_FAMILY} or modify your script.`, __BOXEN_OPTIONS_ERROR));
            exit(-1);
        }

        if(conf.buildSystem == 'make')
        {
            var bs = new FeatMakeSystem(conf, {0: BUILDFEAT, 1: BUILDFEAT_PACKAGE, 2: BUILDFEAT_SUPPORT_FAMILY, 3: BUILDFEAT_VERSION});
            console.log(boxen(`Build system: ${conf.buildSystem}`, __BOXEN_OPTIONS_SUCCESS));
            var gen = bs.generate();
            Object.keys(gen).forEach(key => fs.writeFile(getPath(key), gen[key], (err) => {
                if(err)
                {
                    console.error(boxen(`File write error: ${err}`, __BOXEN_OPTIONS_ERROR));
                    exit(-1);
                }
                else
                {
                    console.log(boxen(`File: "${key}" created successfully.`, __BOXEN_OPTIONS_SUCCESS));
                }
            }));
            // fs.writeFile(getPath())
        }
        else
        {
            console.error(boxen(`Required build system yet not supported by BUILDFEAT-${BUILDFEAT_SUPPORT_FAMILY}.`, __BOXEN_OPTIONS_ERROR));
            exit(-1);
        }
    }
    else
    {
        console.error(boxen("File read error: "+err, __BOXEN_OPTIONS_ERROR));
        exit(-1);
    }
})