import { EnumTimeYear, EnumMonth, EnumService } from "./modules/enumerables.js";
import { Month, TimeYear, Service } from "./modules/classes.js";
import { calcPriceService } from "./modules/calculation.js";
import { inputOnlyDigit } from "./modules/validation.js";
import { Modal } from "./modules/modal.js";

// Получение элементов формы
const form: HTMLFormElement = document.getElementById("form") as HTMLFormElement;
const monthSelect: HTMLSelectElement = document.getElementById("monthSelect") as HTMLSelectElement;
const priceOneDayInput: HTMLInputElement = document.getElementById("priceOneDay") as HTMLInputElement;
const fullNameChildInput: HTMLInputElement = document.getElementById("fullNameChild") as HTMLInputElement;
const countDaysInput: HTMLInputElement = document.getElementById("countDays") as HTMLInputElement;
const otherServiceSelect: HTMLSelectElement = document.getElementById("otherService") as HTMLSelectElement;

// Формирование модального окна
const modal: Modal = new Modal(
    document.getElementById("modal") as HTMLElement,
    document.getElementById("modalClose") as HTMLButtonElement,
    document.getElementById("modalContent") as HTMLElement
);

// ! События

//* При отправке формы
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Получение блока с результатами
    const res: HTMLElement = document.getElementById("resultBlock") as HTMLElement;
    if (res) res.remove();

    // Получение введенных значений
    const month: Month = new Month(EnumMonth[monthSelect.value as keyof typeof EnumMonth]);
    const fullNameChild: string = fullNameChildInput.value;
    const countDays: number = +countDaysInput.value;
    const otherService: Service = new Service(EnumService[otherServiceSelect.value as keyof typeof EnumService]);


    //? Проверка на заполненнность всех полей
    if(!month || !fullNameChild || !countDays) {
        modal.setText("Заполните все поля!").show();
        return;
    }
    //? Проверка на корректность ФИО ребенка
    if(fullNameChild.split(' ').length != 3) {
        modal.setText("Некорректное ФИО ребенка!").show();
        return;
    }


    const resultBlock: string = /*html*/ `
        <div class="result-container input-container input-container--colspan-2" id="resultBlock">
            <label for="result" class="result-container__title">Сумма к оплате за месяц:</label>
            <input type="text" name="result" class="result-container__input" id="result" disabled />
        </div>
    `;

    // Вывод блока с результатами
    document.querySelector(".form__content")!.insertAdjacentHTML("beforeend", resultBlock);
    
    // Вывод суммы
    const resultInput: HTMLInputElement = document.getElementById("result") as HTMLInputElement;
    resultInput.value = String(calcPriceService(month, otherService, countDays)) + "₽";
});

//* Очистка формы
form.addEventListener("reset", (e) => {
    form.reset();

    const resultBlock: HTMLElement = document.getElementById("resultBlock") as HTMLElement;
    resultBlock.remove();
});

//* Вывод цены за день при выборе месяца
monthSelect.addEventListener("change", () => {
    // Вывод цены за день при выборе месяца
    priceOneDayInput.value = String(new Month(EnumMonth[monthSelect.value as keyof typeof EnumMonth]).getTimeYear().getPriceOneDay()) + "₽";

    constraintCountDaysInput();
});

//* Ограничение по количеству дней
countDaysInput.addEventListener("input", constraintCountDaysInput);

//* Возможен ввод только числовых значений
countDaysInput.addEventListener("input", e => inputOnlyDigit(e));

//* Когда пользователь нажимает мне модального окна
window.addEventListener("click", e => {
    if (e.target === modal.ModalWindow) modal.close();
});
//* Когда пользователь нажал клавишу клавиатуры
window.addEventListener("keydown", e => {

    // Закрыть модальное окно, если нажата клавиша Escape
    if (e.key === "Escape") modal.close();
})

//! Функции

// Ограничение по количеству дней в месяце
function constraintCountDaysInput() {
    const countDays: number = +countDaysInput.value;
    const month: EnumMonth = EnumMonth[monthSelect.value as keyof typeof EnumMonth];
    if (countDays > new Month(month).getDaysPerMonth()) {
        countDaysInput.value = new Month(month).getDaysPerMonth().toString() + "₽";
    }
}