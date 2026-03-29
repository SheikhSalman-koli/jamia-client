export const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1]; // যেমন: "abc123xyz.jpg"
  const publicId = lastPart.split('.')[0]; // যেমন: "abc123xyz"
  return publicId;
};