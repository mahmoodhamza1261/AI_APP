export function formatCnic(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 13);
  const part1 = digits.slice(0, 5);
  const part2 = digits.slice(5, 12);
  const part3 = digits.slice(12, 13);

  let result = part1;
  if (part2) result += `-${part2}`;
  if (part3) result += `-${part3}`;
  return result;
}

export function isValidCnic(value: string): boolean {
  return /^\d{5}-\d{7}-\d{1}$/.test(value);
}

export function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function toIsoDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
