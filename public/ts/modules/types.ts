// * Типы
export type TypeMonth = {
    _id: string;
    name: string;
    nameRus: string;
    countDays: number;
    price: number;
    order: number;
    createdAt: Date;
    updatedAt: Date;
};
export type TypeService = {
    _id: string;
    name: string;
    nameRus: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
};
export type TypeOrder = {
    _id: string;
    month_id: string;
    fullNameChild: string;
    countDays: number;
    service_id: string;
    createdAt: Date;
    updatedAt: Date;
};
export type TypeValidation = {
    status: boolean;
    text: string;
};
