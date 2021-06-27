const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#00FA9A', '#7B68EE', '#FFE4B5', '#9400D3', '#FF7F50'];

let time = 0;
let score = 0;


startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
       time = parseInt(event.target.getAttribute('data-time'));
       screens[1].classList.add('up');
       startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})


function startGame() { 
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTitme(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
    if (current < 10) {
        current = `0${current}`
    }
    setTitme(current)
    }
    
}

function setTitme(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

/**
 * Функция отрисовывает круги с рандомными координатами и цветом
 */
function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')

    const color = getRandomColor()
    circle.style.background = color

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)

}

/**
 * Функциия генерирует рандомные координаты кругов
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 * @returns 
 */
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}


/**
 * Функция генерирует рандомный цвет круга из массива colors
 * @returns возвращает рандомный цвет круга из массив
 */
function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}