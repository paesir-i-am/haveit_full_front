export const formatTime = (isoString) => {
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours < 12 ? '오전' : '오후';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  return `${ampm} ${displayHours}:${displayMinutes}`;
};