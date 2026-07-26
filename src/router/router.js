//verificar las rutas
import { renderHome } from "../views/home.js";
import { renderChat } from "../views/chat.js";
import { renderAbout } from "../views/about.js";
import { renderNotFound } from "../views/notFound.js";

const routes = {
    '/': renderHome,
    '/chat': renderChat,
    '/about': renderAbout,
};

export function router() {
    const path = window.location.pathname;
    const renderView = routes[path];
    
    console.log('Routing to:', path);

    if (renderView) {
        renderView();
    } else {
        renderNotFound();
    }
   //* Refactoring
  // const renderView = routes[path] || renderNotFound;
  // renderView();
}


//navigate to
//1. cambiando la url con pushstate
//2. invoco a router para que decida que mostrar dependiendo de la url que llego
export function navigateTo(path) {
    history.pushState({}, '', path);// primer argumento también puede ir null
    router(); // CRÍTICO — sin esto, la URL cambia pero la vista no
}