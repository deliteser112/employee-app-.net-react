export const formatDateWithDuration = (hireDateStr: string): string => {
  const hireDate = new Date(hireDateStr);
  const now = new Date();

  const years = now.getFullYear() - hireDate.getFullYear();
  const months = now.getMonth() - hireDate.getMonth();
  const days = now.getDate() - hireDate.getDate();

  const adjustedMonths = months < 0 ? 12 + months : months;
  const adjustedYears = months < 0 ? years - 1 : years;
  const adjustedDays = days < 0 ? new Date(now.getFullYear(), now.getMonth(), 0).getDate() + days : days;

  const dateString = hireDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
 
  const durationParts: string[] = [];

  if (adjustedYears > 0) {
    durationParts.push(`${adjustedYears}y`);
  }
  if (adjustedMonths > 0) {
    durationParts.push(`${adjustedMonths}m`);
  }
  if (adjustedDays > 0) {
    durationParts.push(`${adjustedDays}d`);
  }
 
  const durationString = durationParts.join(' – ');

  return `${dateString} (${durationString})`;
}

export default formatDateWithDuration;