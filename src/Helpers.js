export function getTimeAndDate(isoString) {
    const date = new Date(isoString);
    
    // Format HH:MM
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;
    
    // Format DD/MM/YY
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = String(date.getUTCFullYear()).slice(-2);
    const formattedDate = `${day}/${month}/${year}`; // "17/05/25"

    return `${time} ${formattedDate}`;
}

export const getFirstTwoSentences = (text) => {
    if (!text) return '';
  
    // Split by sentence-ending punctuation followed by space or newline
    const sentences = text.match(/[^.!?]+[.!?]+[\s\n]*/g);
  
    if (!sentences) return text;
  
    return sentences.slice(0, 2).join('').trim();
  };
  