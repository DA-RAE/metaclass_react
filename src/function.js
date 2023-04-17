function toEng(value) {
    return value.replace(/[^a-zA-Z]/g, '');
}

function toNum(value) {
    return value.replace(/[^0-9]/g, '');
}

function newArr(arr, index, value) {
  return [...arr].map((v, i) => i == index ? value : v);
}

function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${date}`;
}

export { toEng, toNum, newArr, getDate };