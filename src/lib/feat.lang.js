const util = require('util');
const fs = require('fs');
const path = require('path')

const FeatSection = require('./feat.section');

const TY_FEAT_FUNCTION = 1;
const TY_FEAT_SECTION = 0;
const TY_FEAT_VAR_INT = 0;
const TY_FEAT_VAR_STR = 1;
const TY_FEAT_VAR_BOOL = 2;

// Reggular Expressions

/**
 * Regular Expression to match section headers.
 * @ [at]: it starts with a @ [@_SPACE_]
 * @type {RegExp}
 * @private
 */
const SECTION_EXP = new RegExp(/\s*\@ ([^\]]+)/);

const FUNCTION_EXP = new RegExp(/@ (.*[a-zA-Z])+:\((.*)\):/);

const VARIABLE_EXP = new RegExp(/\| (.*[a-zA-Z])+:(.*[a-zA-Z])+/);

/**
 * Regular expression to match comments. Either starting with a
 * semi-colon or a hash.
 * @type {RegExp}
 * @private
 */
const COMMENT_EXP = new RegExp(/^\s*[;#]/);

// RL1.6 Line Boundaries (for unicode)
// ... it shall recognize not only CRLF, LF, CR,
// but also NEL, PS and LS.
const LINE_BOUNDARY = new RegExp(/\r\n|[\n\r\u0085\u2028\u2029]/g);

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const statAsync = util.promisify(fs.stat);

/**
 * @constructor
 */
function FeatLang() {
    this._sections = {};
}

/**
 * Reads a feat script and parse the data
 */
FeatLang.prototype.read = function(file) {
    const lines = fs.readFileSync(file)
        .toString('utf8')
        .split(LINE_BOUNDARY);
    parseLines.call(this, file, lines);
};

function parseLines(file, lines) {

    let lastLabel = 0;

    // let inSection = null;
    let inFunction, inSection = false;
    
    lines.forEach((line, lineNumber) => {
        
        if(!line || line.match(COMMENT_EXP)) return;

        let res_func = FUNCTION_EXP.exec(line);

        if(res_func)
        {
            // FUNCTION
            inFunction = true;
            // console.log(res_func);
            const label = res_func[1];
            lastLabel = label.toLowerCase();
            
            let fu = new FeatSection(label, TY_FEAT_FUNCTION);
            fu.parseParams(res_func[2]);
            this._sections[label.toLowerCase()] = fu;
        }
        else
        {
            let res_sect = SECTION_EXP.exec(line);
            if(res_sect)
            {
                // SECTION
                inSection = true;
                // console.log(res_sect);
                const label = res_sect[1];
                lastLabel = label.toLowerCase();
            
                let sect = new FeatSection(label, TY_FEAT_SECTION);
                this._sections[label.toLowerCase()] = sect;
            }
        }

        if(inFunction || inSection)
        {
            let res_var = VARIABLE_EXP.exec(line);
            if(res_var)
            {
                // VARIABLE
                // console.log(res_var);
                if(this._sections[lastLabel])
                    this._sections[lastLabel].addVar(res_var[1], res_var[2].replaceAll(" ", ""), -1);
            }
            // Check if etc statements
        }
        
        
        // let res = SECTION_EXP.exec(line);
        // if(res)
        // {
        //     const header = res[1];  // sectionName
        //     inSection = new FeatSection(header, -1);
        //     this._sections[header.toLowerCase()] = inSection;
        // }
        // else if(!inSection)
        // {
        //     console.log("ERROR: Missing Section Hdr Name");
        // }
    
    });

    console.log(JSON.stringify(this._sections))

}

module.exports = FeatLang;