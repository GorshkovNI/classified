export var formatMoney = function (number) {
    var value = String(number).replace(/[^0-9]/g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return value + ' ₽';
};
