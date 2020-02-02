export const removeDuplicates = (list, attribute) => {
  return list.filter(
    (item, pos) =>
      list.map(element => element[attribute]).indexOf(item[attribute]) === pos,
  );
};
