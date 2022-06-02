class FeatVar
{
    constructor(name, val, type)
    {
        this._name = name;
        this._value = val;
        this._type = type;  // int: 0, str: 1, bool: 2 etc.
    }
};

class FeatSection
{
    constructor(name, type)
    {
        this._name = name;
        this._vars = [];
        this._type = type;  // type: Function: 1 or Container|Group: 0
        this._params = [];
    }

    addVar = (name, value, type) => {
        this._vars.push(new FeatVar(name, value, type));
    }

    addParam = (name) => {
        this._params.push(new FeatVar(name, -1, -1));
    }

    parseParams = (str = "") => {
        // str: a, b
        let res = str.split(",");
        res.forEach(re => {
            this.addParam(re);
        });
    }
};

module.exports = FeatSection;