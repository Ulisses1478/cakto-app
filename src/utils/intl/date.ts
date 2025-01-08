function getLocaleDateString(date?: string | Date) {
  if (!date) return "";
  const uparsedDate = new Date(date);
  if (isNaN(uparsedDate.getTime())) return date;
  return uparsedDate.toLocaleDateString("pt-BR");
}

export const DateHelper = Object.freeze({
  getLocaleDateString,
});
