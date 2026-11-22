export const budgetView = (budget: { limit: number }, spent: number) => {
  const rate = budget.limit ? Math.round((spent * 100) / budget.limit) : 0;
  return {
    spent,
    rate,
    alertLevel: rate >= 100 ? "over" : rate >= 80 ? "warning" : "ok",
  };
};
