//viene de router
import { navigateTo, router } from "./router/router.js";

document.addEventListener("click", (event)=>{
    const link = event.target.closest('a[data-link]')
    console.log(link)

    if (link){
        event.preventDefault()//frena el comportamiento nativo del explorador
        const url = link.getAttribute("href")
        navigateTo(url)
    }
})

window.addEventListener('popstate', ()=>{
    router();
})

document.addEventListener("DOMContentLoaded", ()=>{
    router()
})
