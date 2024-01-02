import { EnumMonth, EnumTimeYear, EnumService } from "./enumerables.js";

// Цена за день в зависимости от времени года
export const priceOneDay: Record<EnumTimeYear, number> = {
    [EnumTimeYear.Winter]: 600,
    [EnumTimeYear.Spring]: 400,
    [EnumTimeYear.Autumn]: 400,
    [EnumTimeYear.Summer]: 300,
};
// Количество дней в месяце
export const daysPerMonth: Record<EnumMonth, number> = {
    [EnumMonth.January]: 31,
    [EnumMonth.February]: 28,
    [EnumMonth.March]: 31,
    [EnumMonth.April]: 30,
    [EnumMonth.May]: 31,
    [EnumMonth.June]: 30,
    [EnumMonth.July]: 31,
    [EnumMonth.August]: 31,
    [EnumMonth.September]: 30,
    [EnumMonth.October]: 31,
    [EnumMonth.November]: 30,
    [EnumMonth.December]: 31,
};
// Цена дополнительной услуги
export const priceOtherService: Record<EnumService, number> = {
    [EnumService.FunnyBall]: 2000,
    [EnumService.KalyakaMalyaka]: 3000,
    [EnumService.Vocal]: 2500,
};