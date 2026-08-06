import { initChatEngine } from "../engine/chatEngine.js";
import { PERSONAS } from "../services/prompts.js";

function renderPersonaOptions() {
    return Object.entries(PERSONAS)
    .map(([key, persona]) => `<option value="${key}">${persona.label}</option>`)
    .join("");
}

export function renderChat() {
    const app = document.getElementById('app');
    app.innerHTML = `
            <section class="ai-chat-section">                
                <div class="ai-chat-header">
                <h3>🤖 ChatDBZ</h3>
                <select id="persona-select"> 
                ${renderPersonaOptions()}               
                </select>
                </div>

            <div class="chat-container">
                <div id="chat-messages" class="chat-messages"></div>
                <p id="status" class="chat-status"></p>
                <div class="chat-input-area">
                <input id="chat-input" type="text" placeholder="Escribe tu mensaje Sabandija..." />
                <button id="send-btn">Enviar</button>
                </div>
            </div>

            <p id="token-usage" class="token-usage"></p>
    </section>
            `;
    initChatEngine();
}