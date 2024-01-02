import { EnumTimeYear, EnumMonth, EnumService } from "./enumerables.js";
import { priceOneDay, daysPerMonth, priceOtherService } from "./caclualtionData.js";

//! Класс месяца
export class Month {
    private month: EnumMonth;

    constructor(month: EnumMonth) {
        this.month = month;
    }

    get Month(): EnumMonth {
        return this.month;
    }

    // Получение количества дней в месяце
    getDaysPerMonth(): number {
        return daysPerMonth[this.month];
    }

    // Получение времени года в зависимости от месяца
    getTimeYear(): TimeYear {
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
    private timeYear: EnumTimeYear;

    constructor(timeYear: EnumTimeYear) {
        this.timeYear = timeYear;
    }

    get TimeYear(): EnumTimeYear {
        return this.timeYear;
    }

    // Получение цены за день в зависимости от времени года
    getPriceOneDay(): number {
        return priceOneDay[this.timeYear];
    }
}

//! Класс дополнительной услуги
export class Service {
    private service: EnumService;

    constructor(service: EnumService) {
        this.service = service;
    }

    get Service(): EnumService {
        return this.service;
    }

    // Получение цены дополнительной услуги
    getPriceOtherService(): number {
        return priceOtherService[this.service];
    }
}