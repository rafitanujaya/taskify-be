export const generateUsername = (name) => {
  const base = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const random = Math.random().toString(36).substring(2, 5);

  return `${base}_${random}`;
};