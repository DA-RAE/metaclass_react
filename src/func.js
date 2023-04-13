function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${date}`;
}

function postForm(url, value) {
    fetch(url, {
        method: 'POST',
        body: value
    })
        .then(respons => respons.json)
        .then(result => { return result });
}

export { getDate, postForm };