import { Month, TimeYear, Service } from "./calculationClasses.js";

//! Функция подсчета стоимости услуг 
export function calcPriceService(
    priceOneDay: number,
    servicePrice: number,
    countDays: number
): number {
	return priceOneDay * countDays + servicePrice;
}