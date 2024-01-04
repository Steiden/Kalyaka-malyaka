// * Импорты
import { EnumMonth, EnumService } from "./modules/enumerables.js";
import { Month, Service } from "./modules/calculationClasses.js";
import { calcPriceService } from "./modules/calculation.js";
import { Validation } from "./modules/validation.js";
import { Modal } from "./modules/modal.js";
// * Получение элементов формы
const form = document.getElementById("form");
const monthSelect = document.getElementById("monthSelect");
const priceOneDayInput = document.getElementById("priceOneDay");
const fullNameChildInput = document.getElementById("fullNameChild");
const countDaysInput = document.getElementById("countDays");
const otherServiceSelect = document.getElementById("otherService");
const sendButton = document.getElementById("send-btn");
// Формирование модального окна
const modal = new Modal(document.getElementById("modal"), document.getElementById("modalClose"), document.getElementById("modalContent"));
// * Переменные данных
let monthArray;
let serviceArray;
let orderArray;
// ! События
// * При загрузке окна
window.addEventListener("load", (e) => {
    // Подгрузка месяцев в monthSelect
    fetch("/api/get-month")
        .then((res) => res.json())
        .then((months) => {
        monthArray = months;
        // Сортировка месяцев
        monthArray.sort((a, b) => (a.order > b.order ? 1 : -1));
        // Заполнение monthSelect
        monthArray.forEach((month) => {
            const option = document.createElement("option");
            option.value = month.name;
            option.textContent = month.nameRus;
            monthSelect.appendChild(option);
        });
    })
        .catch((err) => {
        console.error(err);
        modal.setError().setText("Ошибка загрузки месяцев. Попробуйте еще раз").show();
    });
    // Подгрузка услуг в otherService
    fetch("/api/get-service")
        .then((res) => res.json())
        .then((services) => {
        serviceArray = services;
        // Заполнение otherService
        serviceArray.forEach((service) => {
            const option = document.createElement("option");
            option.value = service.name;
            option.textContent = service.nameRus;
            otherServiceSelect.appendChild(option);
        });
    })
        .catch((err) => {
        console.error(err);
        modal.setError().setText("Ошибка загрузки услуг. Попробуйте еще раз").show();
    });
});
// * Отправка данных на сервер
sendButton.addEventListener("click", () => {
    // Получение введенных значений
    let { month, fullNameChild, countDays, otherService } = getInputValues();
    //? Проверка введенных значений
    const checkInput = checkInputData();
    if (!checkInput.status) {
        modal.setError().setText(checkInput.text).show();
        return;
    }
    // Формирование данных для отправки
    const dataToFetch = {
        month: month.Month,
        fullNameChild: fullNameChild,
        countDays: countDays,
        otherService: otherService.Service ? otherService.Service : "",
    };
    // * Отпаврка запроса на сервер
    fetch("/api/add-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToFetch),
    })
        .then((res) => {
        if (res.ok)
            modal.setSuccess().setText("Заявка успешно отправлена!").show();
    })
        .catch((err) => {
        console.log(err);
    });
});
// * При отправке формы
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Получение блока с результатами
    const res = document.getElementById("resultBlock");
    if (res)
        res.remove();
    // Получение введенных значений
    let { month, fullNameChild, countDays, otherService } = getInputValues();
    //? Проверка введенных значений
    const checkInput = checkInputData();
    if (!checkInput.status) {
        modal.setError().setText(checkInput.text).show();
        return;
    }
    // Формирование блока с результатом вычислений
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
    const priceOneDay = monthArray.find(m => m.name === monthSelect.value)?.price || 0;
    const servicePrice = serviceArray.find(s => s.name === otherServiceSelect.value)?.price || 0;
    resultInput.value = String(calcPriceService(priceOneDay, servicePrice, countDays)) + "₽";
});
// * Очистка формы
form.addEventListener("reset", (e) => {
    form.reset();
    const resultBlock = document.getElementById("resultBlock");
    resultBlock.remove();
});
// * Вывод цены за день при выборе месяца
monthSelect.addEventListener("change", () => {
    // Вывод цены за день при выборе месяца    
    priceOneDayInput.value = monthArray.find(month => month.name === monthSelect.value)?.price + "₽";
    constraintCountDaysInput();
});
// * Ограничение по количеству дней
countDaysInput.addEventListener("input", constraintCountDaysInput);
// * Возможен ввод только числовых значений
countDaysInput.addEventListener("input", (e) => Validation.inputOnlyDigit(e));
// * Когда пользователь нажимает мне модального окна
window.addEventListener("click", (e) => {
    if (e.target === modal.ModalWindow)
        modal.close();
});
// * Когда пользователь нажал клавишу клавиатуры
window.addEventListener("keydown", (e) => {
    // Закрыть модальное окно, если нажата клавиша Escape
    if (e.key === "Escape")
        modal.close();
});
// * Закрытие модального окна
modal.CloseButton.addEventListener("click", () => modal.close());
// ! Функции
// Ограничение по количеству дней в месяце
function constraintCountDaysInput() {
    const countDays = +countDaysInput.value;
    const month = EnumMonth[monthSelect.value];
    if (countDays > new Month(month).getDaysPerMonth()) {
        countDaysInput.value = new Month(month).getDaysPerMonth().toString() + "₽";
    }
}
// Получение введенных значений
function getInputValues() {
    const month = new Month(EnumMonth[monthSelect.value]);
    const fullNameChild = fullNameChildInput.value;
    const countDays = +countDaysInput.value;
    const otherService = new Service(EnumService[otherServiceSelect.value]);
    return { month, fullNameChild, countDays, otherService };
}
// Проверка введенных данных
function checkInputData() {
    const [checkFieldsFilled, checkFullName, checkCountDays] = [
        Validation.checkFieldsFilled(monthSelect, fullNameChildInput, countDaysInput),
        Validation.checkFullName(fullNameChildInput.value),
        Validation.checkCountDays(+countDaysInput.value),
    ];
    if (!checkFieldsFilled.status)
        return checkFieldsFilled;
    if (!checkFullName.status)
        return checkFullName;
    if (!checkCountDays.status)
        return checkCountDays;
    return { status: true, text: "Все данные корректны!" };
}
