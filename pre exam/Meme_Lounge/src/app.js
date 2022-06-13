
import { logout } from './api/api.js';
import * as api from './api/data.js'

import {page, render} from './lib.js'
import { getUserData } from './util.js';
import { catalogPage } from './views/catalog.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

window.api = api;

const root = document.querySelector('main');

//document.querySelector('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/memes', catalogPage);
page('/login', loginPage);
page('/register', registerPage);

upadteUserNav()

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root)
    ctx.upadteUserNav = upadteUserNav;

    next();
}

//function onLogout() {
    logout()
//}

function upadteUserNav() {
    const userData = getUserData();

    if(userData) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.user span').textContent = `Welcome, ${userData.email}`;    

    }else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}