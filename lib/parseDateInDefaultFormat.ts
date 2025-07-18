export function parseDateInDefaultFormat(date: Date) {
  const fullYear = date.getFullYear();
  const month =
    date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  return `${fullYear}-${month}-${day}`;
}
