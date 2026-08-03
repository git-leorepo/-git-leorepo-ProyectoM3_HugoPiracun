export function renderHome() { 
    const app = document.getElementById('app');
    app.innerHTML = `
        <section class="home">
        <p class="titulo">Bienvenido al chatDBZ</p>                                
        <button class="btn_chat">
            <a href="/chat" data-link class="nav__a">Chat</a>
        </button>
    </section>
    `;
}