// * Импорты
import { EnumTimeYear, EnumMonth, EnumService } from "./modules/enumerables.js";
import { Month, TimeYear, Service } from "./modules/calculationClasses.js";
import { calcPriceService } from "./modules/calculation.js";
import { Validation } from "./modules/validation.js";
import { Modal } from "./modules/modal.js";

// * Получение элементов формы
const form: HTMLFormElement = document.getElementById("form") as HTMLFormElement;
const monthSelect: HTMLSelectElement = document.getElementById("monthSelect") as HTMLSelectElement;
const priceOneDayInput: HTMLInputElement = document.getElementById("priceOneDay") as HTMLInputElement;
const fullNameChildInput: HTMLInputElement = document.getElementById("fullNameChild") as HTMLInputElement;
const countDaysInput: HTMLInputElement = document.getElementById("countDays") as HTMLInputElement;
const otherServiceSelect: HTMLSelectElement = document.getElementById("otherService") as HTMLSelectElement;
const sendButton: HTMLButtonElement = document.getElementById("send-btn") as HTMLButtonElement;

// Формирование модального окна
const modal: Modal = new Modal(
    document.getElementById("modal") as HTMLElement,
    document.getElementById("modalClose") as HTMLButtonElement,
    document.getElementById("modalContent") as HTMLElement
);

// * Типы
type TypeMonth = {
    name: string;
    nameRus: string;
    countDays: number;
    price: number;
    order: number;
};
type TypeService = {
    name: string;
    nameRus: string;
    price: number;
};
type TypeOrder = {
    month: TypeMonth;
    fullNameChild: string;
    countDays: number;
    otherService: TypeService;
};

// ! События

// * При загрузке окна
window.addEventListener("load", (e) => {
    // Подгрузка месяцев в monthSelect
    fetch("/api/get-month")
        .then((res) => res.json())
        .then((months: TypeMonth[]) => {
            // Сортировка месяцев
            months.sort((a, b) => (a.order > b.order ? 1 : -1));

            // Заполнение monthSelect
            months.forEach((month) => {
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
        .then((services: TypeService[]) => {
            // Заполнение otherService
            services.forEach((service) => {
                const option = document.createElement("option");
                option.value = service.name;
                option.textContent = service.nameRus;
                otherServiceSelect.appendChild(option);
            });
        })
        .catch((err) => {
            console.error(err);
            modal.setError().setText("Ошибка загрузки услуг. Попробуйте еще раз").show();
        })
});

// * Отправка данных на сервер
sendButton.addEventListener("click", () => {
    // Получение введенных значений
    let { month, fullNameChild, countDays, otherService } = getInputValues();

    //? Проверка введенных значений
    const checkInput: { status: boolean; text: string } = checkInputData();
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
            if (res.ok) modal.setSuccess().setText("Заявка успешно отправлена!").show();
        })
        .catch((err) => {
            console.log(err);
        });
});

// * При отправке формы
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Получение блока с результатами
    const res: HTMLElement = document.getElementById("resultBlock") as HTMLElement;
    if (res) res.remove();

    // Получение введенных значений
    let { month, fullNameChild, countDays, otherService } = getInputValues();

    //? Проверка введенных значений
    const checkInput: { status: boolean; text: string } = checkInputData();
    if (!checkInput.status) {
        modal.setError().setText(checkInput.text).show();
        return;
    }

    // Формирование блока с результатом вычислений
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

// * Очистка формы
form.addEventListener("reset", (e) => {
    form.reset();

    const resultBlock: HTMLElement = document.getElementById("resultBlock") as HTMLElement;
    resultBlock.remove();
});

// * Вывод цены за день при выборе месяца
monthSelect.addEventListener("change", () => {
    // Вывод цены за день при выборе месяца
    priceOneDayInput.value = String(new Month(EnumMonth[monthSelect.value as keyof typeof EnumMonth]).getTimeYear().getPriceOneDay()) + "₽";

    constraintCountDaysInput();
});

// * Ограничение по количеству дней
countDaysInput.addEventListener("input", constraintCountDaysInput);

// * Возможен ввод только числовых значений
countDaysInput.addEventListener("input", (e) => Validation.inputOnlyDigit(e));

// * Когда пользователь нажимает мне модального окна
window.addEventListener("click", (e) => {
    if (e.target === modal.ModalWindow) modal.close();
});
// * Когда пользователь нажал клавишу клавиатуры
window.addEventListener("keydown", (e) => {
    // Закрыть модальное окно, если нажата клавиша Escape
    if (e.key === "Escape") modal.close();
});

// * Закрытие модального окна
modal.CloseButton.addEventListener("click", () => modal.close());

// ! Функции

// Ограничение по количеству дней в месяце
function constraintCountDaysInput(): void {
    const countDays: number = +countDaysInput.value;
    const month: EnumMonth = EnumMonth[monthSelect.value as keyof typeof EnumMonth];

    if (countDays > new Month(month).getDaysPerMonth()) {
        countDaysInput.value = new Month(month).getDaysPerMonth().toString() + "₽";
    }
}

// Получение введенных значений
function getInputValues(): { month: Month; fullNameChild: string; countDays: number; otherService: Service } {
    const month = new Month(EnumMonth[monthSelect.value as keyof typeof EnumMonth]);
    const fullNameChild: string = fullNameChildInput.value;
    const countDays: number = +countDaysInput.value;
    const otherService: Service = new Service(EnumService[otherServiceSelect.value as keyof typeof EnumService]);

    return { month, fullNameChild, countDays, otherService };
}

// Проверка введенных данных
function checkInputData(): { status: boolean; text: string } {
    const [checkFieldsFilled, checkFullName, checkCountDays]: Array<{ status: boolean; text: string }> = [
        Validation.checkFieldsFilled(monthSelect, fullNameChildInput, countDaysInput, otherServiceSelect),
        Validation.checkFullName(fullNameChildInput.value),
        Validation.checkCountDays(+countDaysInput.value),
    ];

    if (!checkFieldsFilled.status) return checkFieldsFilled;
    if (!checkFullName.status) return checkFullName;
    if (!checkCountDays.status) return checkCountDays;

    return { status: true, text: "Все данные корректны!" };
}
