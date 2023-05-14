export var validateVIN = function (vin) {
    var vinRegExp = /^[A-HJ-NPR-Z0-9]{17}$/;
    return vinRegExp.test(vin) ? true : false;
};
