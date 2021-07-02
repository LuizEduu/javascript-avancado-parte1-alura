class DateHelper {
  static convertStringToDate(date) {
    const convertedDate = new Date(date.split("-"));
    return convertedDate;
  }

  static convertedDateToString(date) {
    const getDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const getMonth =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;

    const getFullDateInBrFormat = `${getDay}/${getMonth}/${date.getFullYear()}`;
    return getFullDateInBrFormat;
  }
}
