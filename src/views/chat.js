export function renderChat() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <section> <h2>💬 Tus conversaciones</h2>
        <ul class="chat-list">
            <li><strong>Equipo Backend</strong> — "¿ya viste el PR del router?"</li>
            <li><strong>María</strong> — "nos vemos en la daily"</li>
            <li><strong>Soporte ChatFlow</strong> — "tu plan se renueva el viernes"</li> </ul> </section>
            `;
}