class FeatConfigurator
{
    constructor(scriptText)
    {
        let parsed = JSON.parse(scriptText);
        Object.keys(parsed).forEach(key => this[key] = parsed[key]);
    }
};

module.exports = FeatConfigurator;