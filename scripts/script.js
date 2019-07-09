const title          = document.getElementById('title')
const txt_input      = document.getElementById('input')
const btn_character  = document.getElementById('character')
const btn_article    = document.getElementById('article')
const btn_clear      = document.getElementById('clear')
const ov_results     = document.getElementById('ov_results')
const div_characters = document.getElementById('characters')
const div_articles   = document.getElementById('articles')
const selecter       = document.getElementById('selecter')

const common_char = [
    "的一是在不了有和人这中大为上个国我以要他",
    "时来用们生到作地于出就分对成会可主发年动",
    "同工也能下过子说产种面而方后多定行学法所",
    "民得经十三之进着等部度家电力里如水化高自",
    "二理起小物现实加量都两体制机当使点从业本",
    "去把性好应开它合还因由其些然前外天政四日",
    "那社义事平形相全表间样与关各重新线内数正",
    "心反你明看原又么利比或但质气第向道命此变",
    "条只没结解问意建月公无系军很情者最立代想",
    "已通并提直题党程展五果料象员革位入常文总",
    "次品式活设及管特件长求老头基资边流路级少",
    "图山统接知较将组见计别她手角期根论运农指",
    "几九区强放决西被干做必战先回则任取据处队",
    "南给色光门即保治北造百规热领七海口东导器",
    "压志世金增争济阶油思术极交受联什认六共权",
    "收证改清己美再采转更单风切打白教速花带安",
    "场身车例真务具万每目至达走积示议声报斗完",
    "类八离华名确才科张信马节话米整空元况今集",
    "温传土许步群广石记需段研界拉林律叫且究观",
    "越织装影算低持音众书布复容儿须际商非验连",
    "断深难近矿千周委素技备半办青省列习响约支",
    "般史感劳便团往酸历市克何除消构府称太准精",
    "值号率族维划选标写存候毛亲快效斯院查江型",
    "眼王按格养易置派层片始却专状育厂京识适属",
    "圆包火住调满县局照参红细引听该铁价严龙飞",
]

window.onload = () => {
    title.onclick = switchFont
    btn_character.onclick = on_character
    btn_article.onclick = on_article
    btn_clear.onclick = on_clear

    div_characters.addEventListener('click', (e) => {
        if (e.target.className === 'char') {
            ele = e.target
            offset = parseInt(window.getComputedStyle(ele).left)
            if (e.layerX < 42) {
                ele.style.left = (offset - 3) + "px"
            } else if (e.layerX > 46) {
                ele.style.left = (offset + 3) + "px"
            }
        }
    })

    buildSelection()
    selecter.onchange = on_select_change

    b_font = false
}


function switchFont() {
    font = b_font ? 'TYZ_KaiShu' : 'TYZ_XingShu'
    text = b_font ? '田英章楷书' : '田英章行书'
    b_font = !b_font
    title.innerHTML = text
    title.style.fontFamily = font
    div_characters.style.fontFamily = font
    div_articles.style.fontFamily = font
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
    ov_results.innerHTML = ot_chars.length === 0 ? '请输入一些中文' : ''
}


function on_article() {
    div_characters.innerHTML = ''
    div_articles.innerHTML = ''
    in_str = txt_input.value
    in_str = in_str.replace(/\r\n/g, "<br>")
    in_str = in_str.replace(/\n/g,"<br>");
    ov_results.innerHTML = in_str.length === 0 ? '请输入一些中文' : ''
    div_articles.innerHTML = in_str.length === 0 ? '' : in_str
}


function on_clear() {
    div_characters.innerHTML = ''
    div_articles.innerHTML = ''
    txt_input.value = ''
    selecter.value = -1
}


function buildSelection() {
    let index = 1
    let default_opt = document.createElement('option')
    default_opt.setAttribute('value', -1)
    default_opt.innerHTML = '选择常用汉字'
    selecter.appendChild(default_opt)
    for (i in common_char) {
        chars = common_char[i]
        let opt = document.createElement('option')
        opt.setAttribute('value', i)
        si = index
        ei = index - 1 + chars.length
        opt.innerHTML = '常用汉字 ' + si.toString() + '-' + ei.toString()
        selecter.appendChild(opt)
        index = ei + 1
    }
}


function on_select_change() {
    val = selecter.value
    if (val >= 0) {
        chars = common_char[val]
        txt_input.value = chars
        on_character()
    } else {
        on_clear()
    }
}


function isChineseChar(str) {
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/
    return reg.test(str)
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