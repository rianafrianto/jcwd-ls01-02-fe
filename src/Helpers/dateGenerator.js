export const dateGenerator = (data) => {
  const current = new Date(data);
  const date = ("0" + current.getDate()).slice(-2);
  const month = ("0" + (current.getMonth() + 1)).slice(-2);
  const year = current.getFullYear();
  return `${date}/${month}/${year}`;
};
