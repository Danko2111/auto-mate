export function getInitials(username) {
  if (!username) return ""; // Handle empty or undefined username

  // Split by spaces to check if there are multiple words
  const words = username.trim().split(" ");

  if (words.length > 1) {
    // Take the first letter of the first two words
    return words[0][0].toUpperCase() + words[1][0].toUpperCase();
  } else {
    // Otherwise, take the first two letters
    return username.slice(0, 2).toUpperCase();
  }
}
