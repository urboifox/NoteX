export function getFormattedDate(inputDate: Date): string {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return inputDate.toLocaleDateString('en-GB', options);
}