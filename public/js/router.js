var el = function (sel) {
    return document.querySelector(sel);
};

var setContent = async function (file) {
    const response = await fetch(`templates/${file}.html`)
    el('.js-content').innerHTML = await response.text();
    setActive(file)
};

const setActive = function (menu) {
    const active = document.querySelector('#navbarNav > ul > li.nav-item.active')
    if (active) active.classList.remove('active')
    document.querySelector('#navbarNav > ul > li.nav-item.nav-' + menu).classList.add('active')
}

const router = new Navigo(null, true, '#');
router
    .on({
        'sobre': async () => {
            await setContent('sobre')
        },
        'configuracoes': async () => {
            await setContent('configuracoes')
            config()
        },
        '*': async () => {
            await setContent('conversor')
            conversor()
        }
    })
    .resolve();