pickerName = document.getElementById("pickerName")
pick = document.getElementById("pick")

let pickers = checkLocalStorage()
let index = 0

pick.addEventListener('click', debounce(pickName, 500))

function checkLocalStorage() {
    let data = JSON.parse(localStorage.getItem('pickers'))
    if (!data) {
        data = ['张飞', '关于', '赵云', '马超', '黄忠']
        localStorage.setItem('pickers', JSON.stringify(data))
    }
    return data
}

function deletePickers(index) {
    pickers = JSON.parse(localStorage.getItem('pickers'))
    pickers.splice(index, 1)
    localStorage.setItem('pickers', JSON.stringify(pickers))
}

function debounce(fn, delay = 1000) {
    let timer = null
    return function () {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, delay)
    }
}

function pickName() {
    const data = checkLocalStorage()
    if (data.length === 0) {
        pickerName.innerText = '抽完了，点击重新开始！'
        localStorage.removeItem('pickers')
        return
    }
    pick.classList.add('disabled')
    pick.disabled = true
    let timer = setInterval(() => {
        index = Math.floor(Math.random() * data.length)
        pickerName.innerText = data[index]
    }, 100)
    setTimeout(() => {
        pick.classList.remove('disabled')
        pick.disabled = false
        clearInterval(timer)
        deletePickers(index)
    }, 5000)
}