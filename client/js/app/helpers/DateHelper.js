class DateHelper {
  constructor() {
    throw new Error("Date helper is not instancied");
  }

  static convertStringToDate(date) {
    const convertedDate = new Date(date.split("-"));
    return convertedDate;
  }

  static convertedDateToString(date) {
    const regex = /[a-z]* \d{2} \d{4}/gi;

    if (!regex.test(date)) {
      throw new Error("Invalid Date informe no padrão yyyy-MM-dd");
    }

    const getDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const getMonth =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;

    const getFullDateInBrFormat = `${getDay}/${getMonth}/${date.getFullYear()}`;
    return getFullDateInBrFormat;
  }
}
