const txt_input      = document.getElementById('input')
const btn_character  = document.getElementById('character')
const btn_article    = document.getElementById('article')
const btn_clear      = document.getElementById('clear')
const ov_results     = document.getElementById('ov_results')
const div_characters = document.getElementById('characters')
const div_articles   = document.getElementById('articles')


window.onload = () => {
    btn_character.onclick = on_character
    btn_article.onclick = on_article
    btn_clear.onclick = on_clear

    div_characters.addEventListener('click', (e) => {
        if (e.target.className == 'char') {
            ele = e.target
            offset = parseInt(window.getComputedStyle(ele).left)
            if (e.layerX < 42) {
                ele.style.left = (offset - 3) + "px"
            } else if (e.layerX > 46) {
                ele.style.left = (offset + 3) + "px"
            }
        }
    })
}


function on_character() {
    div_characters.innerHTML = ''
    div_articles.innerHTML = ''
    in_str   = txt_input.value
    in_chars = in_str.split('')
    ot_chars = new Array()
    for (i in in_chars) {
        char = in_chars[i]
        if (isChineseChar(char)) {
            appendNewChar(char)
            ot_chars.push(char)
        }
    }
    if (ot_chars.length == 0) {
        ov_results.innerHTML = '请输入一些中文'
    } else {
        ov_results.innerHTML = ''
    }
}


function on_article() {
    div_characters.innerHTML = ''
    div_articles.innerHTML = ''
    in_str = txt_input.value
    in_str = in_str.replace(/\r\n/g, "<br>")
    in_str = in_str.replace(/\n/g,"<br>");
    if (in_str.length == 0) {
        ov_results.innerHTML = '请输入一些中文'
    } else {
        div_articles.innerHTML = in_str
    }
}


function on_clear() {
    div_characters.innerHTML = ''
    div_articles.innerHTML = ''
    txt_input.value = ''
}


function isChineseChar(str) {
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/
    return reg.test(str)
}


function newDiv(className) {
    let new_div =
    new_div.setAttribute('class', className)
    return new_div
}


function appendNewChar(char) {
    let div_bg = document.createElement('div')
    div_bg.setAttribute('class', 'bg_char')

    let div_cb = document.createElement('div')
    div_cb.setAttribute('class', 'box_char')

    let span_ch = document.createElement('span')
    span_ch.setAttribute('class', 'char')

    span_ch.innerHTML = char

    div_cb.appendChild(span_ch)
    div_bg.appendChild(div_cb)
    div_characters.appendChild(div_bg)
}