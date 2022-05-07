var FeatConfigurator = require('../lib/configure');

class FeatMakeSystem
{
    constructor(config, signature)
    {
        this.config = config;
        this.makefile = ``;
        this.signature = signature;
    }

    generate = () => {
        this.makefile = `__BUILDFEAT=${"BUILDFEAT"}\n__BUILDFEAT_FAMILY=${this.signature[2]}\n__BUILDFEAT_VERSION=${this.signature[3]}`;

        return {
            "makefile": this.makefile
        }
    }
};

module.exports = FeatMakeSystem;