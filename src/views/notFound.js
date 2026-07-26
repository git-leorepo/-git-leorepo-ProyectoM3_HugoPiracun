export function renderNotFound() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <section class="notfound">
        <img class="vegito__notfound" src="./src/img/silueta.png" alt="vegito">
        <div class="contenedor__notfound">
            <h1 class="cuatro">404</h1>
            <h2 class="Error_404">Error 404</h2>
            <h3 class="ups">¡Ups! No pudimos encontrar
                esta pagina</h3>
        </div>
    </section>
            `;
}