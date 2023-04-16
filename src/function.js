function toEng(value) {
    return value.replace(/[^a-zA-Z]/g, '');
}

function toNum(value) {
    return value.replace(/[^0-9]/g, '');
}

function getNewArr(arr, index, value) {
    const newArr = [...arr];
    newArr[index] = value;
    return newArr;
}

function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${date}`;
}

function fetchPost(url, value) {
    fetch(url, {
        method: 'POST',
        body: value
    })
        .then(respons => respons.json)
        .then(result => { return result });
}

export { toEng, toNum, getNewArr, getDate, fetchPost };