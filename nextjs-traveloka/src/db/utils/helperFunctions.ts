export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export function getUTCDayRange(dateObj: Date) {
  const startOfDay = new Date(
    Date.UTC(
      dateObj.getUTCFullYear(),
      dateObj.getUTCMonth(),
      dateObj.getUTCDate(),
      0,
      0,
      0,
      0
    )
  );

  const endOfDay = new Date(
    Date.UTC(
      dateObj.getUTCFullYear(),
      dateObj.getUTCMonth(),
      dateObj.getUTCDate(),
      23,
      59,
      59,
      999
    )
  );

  return { startOfDay, endOfDay };
}

export function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDuration(duration: number) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h`;

  return `${minutes}m`;
}
