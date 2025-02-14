import moment from "moment";
import CryptoJS from "crypto-js";

const SECRET_KEY = "top-secrate-key"; // Use a strong, secret key

export function getHoursFromISO(isoString) {
  const date = new Date(isoString);
  let hours = date.getHours();
  let mins = date.getMinutes();
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  if(hours < 10) {
    hours = `0${hours}`;
  }
  if(mins < 10) {
    mins = `0${mins}`;
  }
  return `${hours}:${mins} ${period}`;
//   var date = moment(isoString);
//   var dateComponent = date.utc().format('YYYY-MM-DD');
//   var timeComponent = date.utc().format('HH:mm:ss');
//  return timeComponent;
}

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function calculateHourDifference(startISO, endISO) {
  
  const startDate = moment(startISO, "YYY-MM-DDTHH:mm:ssZ").toDate();//new Date(startISO).toLocaleString();
  const endDate = moment(endISO, "YYY-MM-DDTHH:mm:ssZ").toDate();//new Date(endISO).toLocaleString();

  const diffInMilliseconds = endDate - startDate;
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60)); // Convert ms to minutes

  const hours = Math.floor(diffInMinutes / 60); // Extract hours
  const minutes = diffInMinutes % 60; // Get remaining minutes

  return `${hours} hours ${minutes} minutes`;
}

//full date and time with day and week
export  const fullDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).replace(",", " ·");
};

// Encrypt ID and make it URL-safe
export const encryptId = (id) => {
  const encrypted = CryptoJS.AES.encrypt(id.toString(), SECRET_KEY).toString();
  return encodeURIComponent(btoa(encrypted)); // Convert to Base64 and make URL-safe
};

// Decrypt ID
export const decryptId = (encryptedId) => {
  const decoded = atob(decodeURIComponent(encryptedId)); // Decode Base64
  const bytes = CryptoJS.AES.decrypt(decoded, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export function formatDateTime(isoString) {
  const date = new Date(isoString);
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = String(date.getFullYear()).slice(-2);
  
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12 for AM/PM format

  return `${day}-${month}-${year}:${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
}

export function htmlToPlainText(html) {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  return tempElement.textContent || tempElement.innerText;
}