export function renderAbout() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <section class="about py-4">        
        <div class="container">
            <div class="row justify-content-center">
            <!-- Ajusta col-md-6 (50% de ancho) o col-md-8 (66% de ancho) según prefieras -->
            <div class="col-12 col-md-8">
        
                <div id="carouselExampleCaptions" class="carousel slide">
                <!-- TODO TU CÓDIGO DEL CARROUSEL AQUÍ -->
                    <div id="carouselExampleCaptions" class="carousel slide">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://media1.tenor.com/m/4KmWmgP-M2wAAAAd/daima-dragon-ball.gif" class="d-block w-100" alt="Imagen 1">
                        <div class="carousel-caption">
                            <h5>CHATDBZ</h5>
                            <p>Es una experiencia web interactiva diseñada para los fanáticos de Dragon Ball Z</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="https://media1.tenor.com/m/ko6ikUc8bRgAAAAd/nature-vegeta.gif" class="d-block w-100" alt="Imagen 2">
                            <div class="carousel-caption">
                            <h5>CHATDBZ</h5>
                            <p>Poner a prueba tu carácter chateando en tiempo real con el mismísimo Príncipe de los Saiyajin, Vegeta.</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="https://media1.tenor.com/m/RS8xodupMUQAAAAd/goku-vegeta.gif" class="d-block w-100" alt="Imagen 3">
                        <div class="carousel-caption">
                            <h5>CHATDBZ</h5>
                            <p>Combina desarrollo web e inteligencia artificial para traer a la vida a uno de los personajes más icónicos del anime.</p>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
                    </div>
                </div>
            </div>
            </div>
        </div>

        <div class="description">
        
    </div>
    </section>    
    `; }