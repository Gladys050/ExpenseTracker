export const getExpenseDateInfo = () => {
  const today = new Date();

  const month = today.toLocaleString("default", {
    month: "long",
  });

  const year = today.getFullYear();

  const firstDay = new Date(year, 0, 1);

  const daysPassed = Math.floor((today - firstDay) / (24 * 60 * 60 * 1000));

  const week = Math.ceil((daysPassed + firstDay.getDay() + 1) / 7);

  return {
    date: today.toISOString().split("T")[0],
    month,
    year,
    week,
  };
};
