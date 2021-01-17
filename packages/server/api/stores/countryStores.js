const countries = require('../../data/config/flags.json');
const _ = require('lodash');

const countriesArr = getCountriesArr();

function getCountriesArr() {
    return _.map(countries, (name, id) => ({
        name: name,
        code: id
    }))
}

function getCountries() {
    return countries;
}

function findCountryByName(name) {
    return _.find(countriesArr, (country) =>
    country.name.toLowerCase() === name.toLowerCase());
}

module.exports = {
    getCountries,
    getCountriesArr,
    findCountryByName
}