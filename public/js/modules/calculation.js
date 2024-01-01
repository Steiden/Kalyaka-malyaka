//! Функция подсчета стоимости услуг 
export function calcPriceService(month, service, countDays) {
    const priceOneDay = month.getTimeYear().getPriceOneDay();
    const priceOtherService = service.Service ? service.getPriceOtherService() : 0;
    return priceOneDay * countDays + priceOtherService;
}
