var FeatConfigurator = require('../lib/configure');

class FeatMakeSystem
{
    constructor(config, signature)
    {
        this.config = config;
        this.makefile = ``;
        this.signature = signature;
        this.compilerOptions = {};
        this.compilers = {};
        this.sources = {};
        this.objects = [];
    }

    getSystemCompilers = (lang = 'c') => {
        switch (lang.toLowerCase()) {
            case 'c':
                return 'gcc';
            case 'cxx':
                return 'g++';
            case 'python':
                return 'python3';
            default:
                return 'unknown';
        }
    }

    getLanguageExtensions = (lan) => {
        if(lan == 'python')
        {
            return 'py';
        }
        else if(lan == 'c')
        {
            return 'c';
        }
        else if(lan == 'cxx')
        {
            return 'cxx';
        }
    }

    getWildcardValue = (l) => {
        let exts = '$(FEAT_SRCDIR)';

        for (let t = 0; t < this.config.sourceDepth; t++)
        {
            exts += '/*';
        }

        return `$(wildcard ${exts}.${this.getLanguageExtensions(l)})`;
    }

    generate = () => {
        this.makefile = `__BUILDFEAT=${"BUILDFEAT"}\n__BUILDFEAT_FAMILY=${this.signature[2]}\n__BUILDFEAT_VERSION=${this.signature[3]}`;

        this.makefile += `\nFEAT_BUILDDIR=${this.config.buildDir}`;
        this.makefile += `\nFEAT_BINDIR=${this.config.binDir}`;
        this.makefile += `\nFEAT_SRCDIR=${this.config.srcDir}`;
        this.makefile += `\nFEAT_ROOTDIR=${this.config.projectRoot}`;

        this.compilerOptions['USE_SYSTEM'] = this.config.compilerOptions.useSystem;
        this.compilerOptions['COMPILER_ROOT'] = this.config.compilerOptions.path;

        if(this.compilerOptions['USE_SYSTEM'] === true)
        {
            this.config.languages.map(l => {
                this.compilers[l] = this.getSystemCompilers(l);
                this.makefile += `\nFEAT_${l.toUpperCase()}=${this.compilers[l]}`;
                this.sources[l] = `\nFEAT_${l.toUpperCase()}_SOURCES=${this.getWildcardValue(l)}`;
                this.objects.push(`$(patsubst $(FEAT_SRCDIR)/%.${this.getLanguageExtensions(l)}, $(FEAT_BUILDDIR)/%.${this.getLanguageExtensions(l)}.o, $(FEAT_${l.toUpperCase()}_SOURCES))`);
            });
        }

        Object.keys(this.sources).forEach(key => this.makefile += this.sources[key]);

        Object.keys(this.config.customs).forEach(key => this.makefile += `\n${key}=${this.config.customs[key]}`);

        this.makefile += `\nFEAT_OBJECTS=   \\`;
        let i = 0;
        let l = this.objects.length;
        this.objects.map(objl => {
            this.makefile += `\n\t${objl}`;
            if(i != l-1)
            {
                this.makefile += `\t\\`;
            }
            i++;
        });

        this.makefile += `\n${this.config.copyMe}`;

        return {
            "makefile": this.makefile
        }
    }
};

module.exports = FeatMakeSystem;