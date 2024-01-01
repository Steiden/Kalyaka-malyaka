//! Функция ограничения ввода только числовых символов
export function inputOnlyDigit(e) {
    try {
        // Получение поля ввода
        const input = e.target;
        // Ввод только чисел
        input.value = input.value.replace(/\D/g, "");
        // Невозможность ввода двух нулей
        input.value = input.value.replace(/00/g, "0");
        // Если запись имеет вид '02', '03' и т.п.
        if (input.value.match(/0\w+/g))
            input.value = input.value[1];
        return true;
    }
    catch (ex) {
        console.error(ex);
        return false;
    }
}
