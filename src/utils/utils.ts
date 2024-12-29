export function formatDateForDisplay(date: string): string {
  const parsedDate = new Date(date);
  const currentYear = new Date().getFullYear();
  const dateYear = parsedDate.getFullYear();

  const yearPart = currentYear === dateYear ? "" : `${dateYear} `;
  const monthDayPart = parsedDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });

  return `${yearPart}${monthDayPart}`;
}
export function addZeroString(number: number): string {
  if (number < 10) return `0${number}`;
  return String(number);
}
