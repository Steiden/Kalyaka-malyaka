//! Функция подсчета стоимости услуг 
export function calcPriceService(priceOneDay, servicePrice, countDays) {
    return priceOneDay * countDays + servicePrice;
}
