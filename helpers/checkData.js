// Проверка полученных значений
function checkData(...data) {
    for (const value of data) {
        if(!value) return false;
    }
    return true;
}

module.exports = checkData;