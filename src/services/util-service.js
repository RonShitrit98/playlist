export const utilService = {
  copyItem,
  makeId,
  checkString,
};

function copyItem(item) {
  return JSON.parse(JSON.stringify(item));
}

function makeId(length = 8) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function checkString(string, type = "username") {
  if (type === "username") return /^[0-9a-zA-Z_.-]+$/.test(string);
}
