export class Validation {
    // * Функция ограничения ввода только числовых символов
    static inputOnlyDigit(e: Event): boolean {
        try {
            // Получение поля ввода
            const input: HTMLInputElement = e.target as HTMLInputElement;

            // Ввод только чисел
            input.value = input.value.replace(/\D/g, "");

            // Невозможность ввода двух нулей
            input.value = input.value.replace(/00/g, "0");

            // Если запись имеет вид '02', '03' и т.п.
            if (input.value.match(/0\w+/g)) input.value = input.value[1];

            return true;
        } catch (ex) {
            console.error(ex);
            return false;
        }
    }

    // * Проверка заполненности полей
    static checkFieldsFilled(...fields: Array<HTMLInputElement | HTMLSelectElement>): { status: boolean; text: string } {
        
        for (const field of fields) {
            if (field.value.trim() === "") {
                return { status: false, text: "Заполните все поля!" };
            }
        }

        return { status: true, text: "Все данные корректны!" };
    }

    // * Проверка ФИО
    static checkFullName(fullName: string): { status: boolean; text: string } {
        if (fullName.split(" ").length != 3) {
            return { status: false, text: "Некорректное ФИО ребенка!" };
        }

        let [name, surname, patronymic] = fullName.split(" ").map((str) => str.trim());
        if (!name || !surname || !patronymic) {
            return { status: false, text: "Фамилия, имя или отчество не может быть пустым" };
        }

        return { status: true, text: "ФИО корректно!" };
    }

    // * Проверка количества дней
    static checkCountDays(countDays: number): { status: boolean; text: string } {
        if (countDays <= 0 || countDays > 31) {
            return { status: false, text: "Количество дней не может быть равно нулю или больше 31!" };
        }

        return { status: true, text: "Количество дней корректно!" };
    }
}
