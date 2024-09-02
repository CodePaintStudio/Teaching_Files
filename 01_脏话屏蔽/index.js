const list = document.querySelector('.list');
const submit = document.getElementById('submit');
let bannedWords = [];

list.innerHTML = `<li class="item"><span class="index">1</span>快看，这个人还在用qq群传代码! <span class="time">${getCurrentTimeFormatted()}</span></li>`;

function getCurrentTimeFormatted() {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    return hours + ":" + minutes + ":" + seconds;
}

function replaceBannedWords(text) {
    bannedWords.forEach(word => {
        const regex = new RegExp(word, 'gi');
        text = text.replace(regex, '*'.repeat(word.length));
    });
    return text;
}

function submitHandle() {
    let text = document.getElementById('input').value;
    if (!text.length) {
        alert('请输入内容');
        return;
    }

    text = replaceBannedWords(text);

    const nextIndex = list.children.length + 1;
    list.innerHTML += `<li class="item"><span class="index">${nextIndex}</span>${text}<span class="time">${getCurrentTimeFormatted()}</span></li>`;
}

submit.addEventListener('click', submitHandle);

document.addEventListener('DOMContentLoaded', () => {
    fetch('./bannedWords.json')
        .then(response => response.json())
        .then(data => {
            bannedWords = data.bannedWords;
        })
        .catch(error => {
            alert('无法获取屏蔽词汇', error);
        });
});
