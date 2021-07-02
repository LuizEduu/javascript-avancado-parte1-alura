function convertDate(date) {
  const convertedDate = new Date(
    ...date.split("-").map((item, index) => (index == 1 ? item - 1 : item))
  );
  return convertedDate;
}
