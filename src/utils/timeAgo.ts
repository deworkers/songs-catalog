import declOfNum from './declOfNum'

export default (timestamp: number) => {
    const currentDate: number = Date.now();
    const targetDate: number = timestamp * 1000;
    const timeDifference: number = currentDate - targetDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
        return `${weeks} ${declOfNum(weeks, ['неделю', 'недели', 'недель'])} назад`;
    }
    if (days > 0) {
        return `${days} ${declOfNum(days, ['день', 'дня', 'дней'])} назад`;
    }
    if (hours > 0) {
        return `${hours} ${declOfNum(hours, ['час', 'часа', 'часов'])} назад`;
    }
    if (minutes > 0) {
        return `${minutes} ${declOfNum(minutes, ['минуту', 'минуты', 'минут'])} назад`;
    }
    return `${seconds} ${declOfNum(seconds, ['секуну', 'секунды', 'секунд'])} назад`;
};
