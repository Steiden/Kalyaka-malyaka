import { Month, TimeYear, Service } from "./calculationClasses.js";

//! Функция подсчета стоимости услуг 
export function calcPriceService(
    month: Month,
    service: Service,
    countDays: number
): number {
    const priceOneDay: number = month.getTimeYear().getPriceOneDay();
    const priceOtherService: number = service.Service ? service.getPriceOtherService() : 0;
	return priceOneDay * countDays + priceOtherService;
}