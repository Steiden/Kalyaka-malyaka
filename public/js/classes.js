import { EnumTimeYear, EnumMonth } from "./enumerables.js";
import { priceOneDay, daysPerMonth, priceOtherService } from "./caclualtionData.js";
//! Класс месяца
export class Month {
    month;
    constructor(month) {
        this.month = month;
    }
    get Month() {
        return this.month;
    }
    // Получение количества дней в месяце
    getDaysPerMonth() {
        return daysPerMonth[this.month];
    }
    // Получение времени года в зависимости от месяца
    getTimeYear() {
        switch (this.month) {
            case EnumMonth.January:
            case EnumMonth.February:
            case EnumMonth.December:
                return new TimeYear(EnumTimeYear.Winter);
            case EnumMonth.March:
            case EnumMonth.April:
            case EnumMonth.May:
                return new TimeYear(EnumTimeYear.Spring);
            case EnumMonth.June:
            case EnumMonth.July:
            case EnumMonth.August:
                return new TimeYear(EnumTimeYear.Summer);
            case EnumMonth.September:
            case EnumMonth.October:
            case EnumMonth.November:
                return new TimeYear(EnumTimeYear.Autumn);
            default:
                return new TimeYear(EnumTimeYear.Summer);
        }
    }
}
//! Класс времени года
export class TimeYear {
    timeYear;
    constructor(timeYear) {
        this.timeYear = timeYear;
    }
    get TimeYear() {
        return this.timeYear;
    }
    // Получение цены за день в зависимости от времени года
    getPriceOneDay() {
        return priceOneDay[this.timeYear];
    }
}
//! Класс дополнительной услуги
export class Service {
    service;
    constructor(service) {
        this.service = service;
    }
    get Service() {
        return this.service;
    }
    // Получение цены дополнительной услуги
    getPriceOtherService() {
        return priceOtherService[this.service];
    }
}
