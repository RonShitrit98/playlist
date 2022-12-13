export const utilService = {
  copyItem,
};

function copyItem(item) {
  return JSON.parse(JSON.stringify(item));
}
