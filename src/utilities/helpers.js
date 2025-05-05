// import '@formatjs/intl'; // This polyfills Intl for Node.js
// import 'intl'; // This polyfills Intl for Node.js

// export function formatCurrency(value) {
//   return new Intl.NumberFormat("en", {
//     style: "currency",
//     currency: "EUR",
//   }).format(value);
// }

// export function formatDate(dateStr) {
//   return new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "short",
//     hour: "2-digit",
//     minute: "2-digit",
//   }).format(new Date(dateStr));
// }

// export function calcMinutesLeft(dateStr) {
//   const d1 = new Date().getTime();
//   const d2 = new Date(dateStr).getTime();
//   return Math.round((d2 - d1) / 60000);
// }






// Format currency without Intl
export function formatCurrency(value) {
  // Ensure the value is a number
  value = parseFloat(value);

  if (isNaN(value)) return "RS"; // Return €0.00 if value is not a valid number

  // Manually format to currency with thousands separator
  const parts = value.toFixed(2).split(".");
  let integerPart = parts[0];
  const decimalPart = parts[1];

  // Add thousands separator
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `RS-${integerPart}.${decimalPart}`;
}

// Format date without Intl
export function formatDate(dateStr) {
  const date = new Date(dateStr);

  // Ensure it's a valid date
  if (isNaN(date.getTime())) return "Invalid Date";

  const day = date.getDate();
  const month = date.getMonth(); // 0-based index (0 = January)
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Convert month index to short month name (e.g., 0 = Jan, 1 = Feb, etc.)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const shortMonth = monthNames[month];

  // Format the date as "day short-month hour:minute"
  return `${day} ${shortMonth} ${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

// Calculate minutes left until the target date (same as previous)
export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}
