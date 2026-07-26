export function renderHome() { 
    const app = document.getElementById('app');
    app.innerHTML = `
        <section class="cuerpo">        
        <div class="contenedor__cuerpo">
            Chatea con Vegeta
            <button class="btn__contenedor">
                Chat
            </button>            
        </div>
    </section>`;
}