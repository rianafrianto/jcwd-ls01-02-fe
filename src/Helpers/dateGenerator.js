export const dateGenerator = (data) => {
  data = data.split(" ");
  data[0] = data[0].split("-").join("/");
  data = `${data[0]} ${data[1]}`;
  const current = new Date(`${data}`);
  const date = ("0" + current.getDate()).slice(-2);
  const month = ("0" + (current.getMonth() + 1)).slice(-2);
  const year = current.getFullYear();
  return `${date}/${month}/${year}`;
};

export const fullDateGenerator = (data) => {
  data = data.split(" ");
  data[0] = data[0].split("-").join("/");
  data = `${data[0]} ${data[1]}`;
  let date = new Date(`${data}`).toString().split(" ");
  date[4] = date[4].split(":");
  date[4] = `${date[4][0]}:${date[4][1]}`;
  return `${date[0]}, ${date[1]} ${date[2]} ${date[3]}, ${date[4]}`;
};

export const shortDateGenerator = (data) => {
  data = data.split("-").join("/");
  const current = new Date(`${data}`);
  const date = ("0" + current.getDate()).slice(-2);
  const month = ("0" + (current.getMonth() + 1)).slice(-2);
  const year = current.getFullYear();
  return `${date}/${month}/${year}`;
};

export const newDateGenerator = () => {
  const current = new Date();
  const date = ("0" + current.getDate()).slice(-2);
  const month = ("0" + (current.getMonth() + 1)).slice(-2);
  const year = current.getFullYear().toString().substring(2);
  return `${year}/${month}/${date}`;
};

export const validDateGenerator = (data, type) => {
  const current = new Date(data);
  type
    ? current.setDate(current.getDate() + 1)
    : current.setDate(current.getDate() - 1);
  const date = ("0" + current.getDate()).slice(-2);
  const month = ("0" + (current.getMonth() + 1)).slice(-2);
  const year = current.getFullYear().toString();
  return `${year}-${month}-${date}`;
};
