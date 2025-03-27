import moment from "moment-timezone";

export function capitalizeFirstLetter(string) {
  if (!string) return ""; // Return empty string for falsy values
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function calculateExpiryTime(type, expiryStr) {
  const expiryTime = new Date(expiryStr);
  const currentTime = new Date();
  const timeDifference = expiryTime - currentTime;
  const totalSeconds = Math.floor(timeDifference / 1000);
  if (timeDifference < 0) {
    return "0";
  }
  if (type == "s") {
    const seconds = totalSeconds % 60;
    return seconds;
  }
  if (type == "h") {
    const hours = Math.floor(totalSeconds / 3600);
    return hours;
  }
  if (type == "m") {
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return minutes;
  }
}

export function getTimeRemaining(endDate) {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const inputDateTime = moment.tz(endDate, userTimezone);
  const now = moment.tz(userTimezone);
  const diffInSeconds = inputDateTime.diff(now, "seconds");

  if (diffInSeconds <= 0) {
    return "Event has already ended.";
  }

  const days = Math.floor(diffInSeconds / 86400);
  const hours = Math.floor((diffInSeconds % 86400) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  let timeString = "Ending in ";
  if (days > 0) timeString += `${days} Days `;
  timeString += `${hours} Hours ${minutes} Mins ${seconds} Seconds`;

  return timeString.trim();
}

export const calculateTimeLeft = (dateString) => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const inputDateTime = moment.tz(dateString, userTimezone);
  const now = moment.tz(userTimezone);

  const diffInSeconds = inputDateTime.diff(now, "seconds");

  if (diffInSeconds <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diffInSeconds / 86400);
  const hours = Math.floor((diffInSeconds % 86400) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  return { days, hours, minutes, seconds };
};

// export const calculateTimeLeft = (endTime) => {
//   const currentTime = new Date();
//   const expireTime = new Date(endTime);
//   const timeLeft = expireTime - currentTime;

//   if (timeLeft <= 0) {
//     return { hours: 0, minutes: 0, seconds: 0 };
//   }

//   const hours = Math.floor(timeLeft / (1000 * 60 * 60));
//   const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

//   return { hours, minutes, seconds };
// };

export const formatDateTime = (inputDateStr) => {
  const date = new Date(inputDateStr);

  // Get the user's timezone dynamically
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Format the date using Intl.DateTimeFormat with timezone
  const formattedDateTime = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: userTimezone, // Use the user's timezone
  }).format(date);

  return formattedDateTime;
  // const date = new Date(inputDateStr);
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  // const day = date.getDate();
  // const month = months[date.getMonth()];
  // const year = date.getFullYear();
  // let hours = date.getHours();
  // const minutes = date.getMinutes().toString().padStart(2, "0");
  // const ampm = hours >= 12 ? "PM" : "AM";

  // hours = hours % 12; // Convert to 12-hour format
  // hours = hours ? hours : 12; // If hour is 0, set it to 12
  // hours = hours.toString().padStart(2, "0"); // Add leading zero if necessary

  // return ` ${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`; // Include AM/PM
};
