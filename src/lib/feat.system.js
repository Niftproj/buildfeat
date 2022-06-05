var fs = require('fs'),
    path = require('path');
const { exit } = require("process");

class FeatSystem
{
    constructor(conf)
    {
        this._configuration = conf;
    }

    _createDirs = () => {
        
        this._configuration['directories']._vars.forEach(directory => {
            fs.mkdir(path.join("./", directory._value), (err) => {
                if(err)
                {
                    // Currently Dismiss.
                }
            });
        });

    }

    _start = () => {
        this._createDirs();
        console.log(this._configuration);
    }
};

module.exports = FeatSystem;