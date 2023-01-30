const formataDate = (createdAt) => {
  const date = new Date(createdAt);
  const [day, year] = [date.getDate(), date.getFullYear()];
  const month = date.toLocaleString("en", { month: "long" });
  return [day, month, year];
};

export default formataDate;
