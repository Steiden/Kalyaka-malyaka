import { EnumMonth, EnumService } from "./modules/enumerables.js";
import { Month, Service } from "./modules/classes.js";
import { calcPriceService } from "./modules/calculation.js";
import { inputOnlyDigit } from "./modules/validation.js";
import { Modal } from "./modules/modal.js";
// Получение элементов формы
const form = document.getElementById("form");
const monthSelect = document.getElementById("monthSelect");
const priceOneDayInput = document.getElementById("priceOneDay");
const fullNameChildInput = document.getElementById("fullNameChild");
const countDaysInput = document.getElementById("countDays");
const otherServiceSelect = document.getElementById("otherService");
// Формирование модального окна
const modal = new Modal(document.getElementById("modal"), document.getElementById("modalClose"), document.getElementById("modalContent"));
// ! События
//* При отправке формы
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Получение блока с результатами
    const res = document.getElementById("resultBlock");
    if (res)
        res.remove();
    // Получение введенных значений
    let month = new Month(EnumMonth[monthSelect.value]);
    let fullNameChild = fullNameChildInput.value;
    let countDays = +countDaysInput.value;
    let otherService = new Service(EnumService[otherServiceSelect.value]);
    //? Проверка на заполненнность всех полей
    if (!month || !fullNameChild || !countDays) {
        modal.setText("Заполните все поля!").show();
        return;
    }
    //? Проверка на корректность ФИО ребенка
    if (fullNameChild.split(" ").length != 3) {
        let [name, surname, patronymic] = fullNameChild.split(" ");
        if (!name || !surname || !patronymic) {
            modal.setText("Некорректное ФИО ребенка!").show();
            return;
        }
        modal.setText("Некорректное ФИО ребенка!").show();
        return;
    }
    // Формирование данных для отправки
    const dataToFetch = {
        month: month.Month,
        fullNameChild: fullNameChild,
        countDays: countDays,
        otherService: otherService.Service ? otherService.Service : ''
    };
    // * Отпаврка запроса на сервер
    fetch("/api/add-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(dataToFetch)
    })
        .then(res => {
        if (res.ok)
            modal.setText("Заявка успешно отправлена!").show();
    })
        .catch(err => {
        console.log(err);
    });
    // TODO Сделать отправку данных на сервер отдельной кнопкой
    const resultBlock = /*html*/ `
        <div class="result-container input-container input-container--colspan-2" id="resultBlock">
            <label for="result" class="result-container__title">Сумма к оплате за месяц:</label>
            <input type="text" name="result" class="result-container__input" id="result" disabled />
        </div>
    `;
    // Вывод блока с результатами
    document.querySelector(".form__content").insertAdjacentHTML("beforeend", resultBlock);
    // Вывод суммы
    const resultInput = document.getElementById("result");
    resultInput.value = String(calcPriceService(month, otherService, countDays)) + "₽";
});
//* Очистка формы
form.addEventListener("reset", (e) => {
    form.reset();
    const resultBlock = document.getElementById("resultBlock");
    resultBlock.remove();
});
//* Вывод цены за день при выборе месяца
monthSelect.addEventListener("change", () => {
    // Вывод цены за день при выборе месяца
    priceOneDayInput.value = String(new Month(EnumMonth[monthSelect.value]).getTimeYear().getPriceOneDay()) + "₽";
    constraintCountDaysInput();
});
//* Ограничение по количеству дней
countDaysInput.addEventListener("input", constraintCountDaysInput);
//* Возможен ввод только числовых значений
countDaysInput.addEventListener("input", (e) => inputOnlyDigit(e));
//* Когда пользователь нажимает мне модального окна
window.addEventListener("click", (e) => {
    if (e.target === modal.ModalWindow)
        modal.close();
});
//* Когда пользователь нажал клавишу клавиатуры
window.addEventListener("keydown", (e) => {
    // Закрыть модальное окно, если нажата клавиша Escape
    if (e.key === "Escape")
        modal.close();
});
//! Функции
// Ограничение по количеству дней в месяце
function constraintCountDaysInput() {
    const countDays = +countDaysInput.value;
    const month = EnumMonth[monthSelect.value];
    if (countDays > new Month(month).getDaysPerMonth()) {
        countDaysInput.value = new Month(month).getDaysPerMonth().toString() + "₽";
    }
}
