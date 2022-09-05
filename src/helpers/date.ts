export const getCurrentMonth = () => {
    let now = new Date();

    return `${now.getFullYear()}-${now.getMonth()+1}`;
}

export const formatDate = (date: Date): string => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${year}-${addZeroToDate(month)}-${addZeroToDate(day)}`;
}

export const addZeroToDate = (n: number): string => n < 10 ? `0${n}` : `${n}`;

export const formatMonth = (currentMonth: string): string => {
    let [year, month] = currentMonth.split('-');
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    return `${months[parseInt(month) - 1]} de ${year}`
}

export const reverseDate = (date: string): string => {
    let [day, month, year] = date.split('-');

    return `${year}-${month}-${day}`;
}

export const strToDate = (strDate: string): Date => {
    let [year, month, day] = strDate.split('-');

    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}