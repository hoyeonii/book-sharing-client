export const addCart = (item) => {
  return { type: "ADD_ITEM", payload: item };
};
export const deleteCart = (items) => {
  return { type: "DELETE_ITEM", payload: items };
};
export const deleteAll = () => {
  return { type: "DELETE_ALL" };
};
