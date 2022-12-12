export const utilService = {
  copyItem,
};

function copyItem(item) {
    console.log(item)
  return JSON.parse(JSON.stringify(item));
}
