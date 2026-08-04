export function renderChat() {
    const app = document.getElementById('app');
    app.innerHTML = `
            <section class="component-chat">
        <div class="chatApp">
            <!-- <header class="chatHeader">
                <h1 class="chatTitle">Chat</h1>
                <p class="chatSubtitle">Con tu personaje favorito</p>
            </header> -->

            <main class="chatMessages" aria-label="Mensajes">
                <div class="message message--character">Hola, ¿en qué te ayudo?</div>
                <div class="message message--user">Quiero practicar responsive.</div>
                <div class="message message--character">Perfecto, empecemos con flexbox. Es ideal para layouts de una dimension</div>
                <div class="message message--user">¿Y que hace flex:1?</div>
                <div class="message message--character">Le dice al elemento que tome todo el espacio disponible en el eje p´rincipal. en nuestro chat, hace que el panel de mensajes crezca entre el header y el composer</div>
                <div class="message message--user">¿Y el overflow: auto para que sirve?</div>
                <div class="message message--character">Para que el scroll ocurra solo dentro del panel, no en toda la poagina. El header y el input quedan fijos siempre</div>
                <div class="message message--user">Tiene muchoi sentido ahora</div>
                <div class="message message--character">Exacto Y lo mejor es que el patron escala sin cambios: funciona desde 320 px hasta desktop</div>
                <div class="message message--user">toma lo tuyo</div>
                <!-- más mensajes -->            
            </main>
        

            <form class="chatComposer">
                <input 
                class="chatInput" 
                type="text" 
                placeholder="Escribe un mensaje…"
                aria-label="Escribe tu mensaje"
                />
                <button class="chatSend" type="submit">Enviar</button>
            </form>
        </div>

    </section>
            `;
}