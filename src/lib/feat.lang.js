const util = require('util');
const fs = require('fs');
const path = require('path')

// Reggular Expressions

/**
 * Regular Expression to match section headers.
 * @ [at]: it starts with a @ [@_SPACE_]
 * @type {RegExp}
 * @private
 */
const SECTION_EXP = new RegExp(/\s*\@ ([^\]]+)/);

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

    let inSection = null;
    
    lines.forEach((line, lineNumber) => {
        if(!line || line.match(COMMENT_EXP)) return;
        let res = SECTION_EXP.exec(line);
        if(res)
        {
            const header = res[1];  // sectionName
            inSection = {};
            this._sections[header] = inSection;
        }
        else if(!inSection)
        {
            console.log("ERROR: Missing Section Hdr Name");
        }
    });

    console.log(this._sections)

}

module.exports = FeatLang;