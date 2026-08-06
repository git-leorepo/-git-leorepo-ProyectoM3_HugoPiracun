//? sendMessage (orquestador), historial, debounce

import { fetchGeminiAPI } from "../services/geminiApi.js";
import { DEFAULT_PERSONA_KEY, PERSONAS } from "../services/prompts.js";
import { getSessionUsage, isSessionQuotaExceeded, recordRealUsage } from "../services/quotaSimulator.js";
import { buildPayload, normalizeAIResponse } from "../transform/chatPayload.js";
import { clearInput, clearStatus, disableInput, disableSendButton, enableInput, enableSendButton, renderMessages, showError, showRetryState, updateTokenUsage } from "../ui/render.js";

const MAX_HISTORY = 12; //límite de mensajes que viajan en cada request

let contents = [];
let isLoading = false;
let currentInstruction = DEFAULT_PERSONA_KEY;


function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

// Recorta el historial a los últimos MAX_HISTORY mensajes (user + model juntos).
// Se llama después de cada push, así el array nunca crece sin límite.
function trimHistory() {
  if (contents.length > MAX_HISTORY) {
    contents = contents.slice(contents.length - MAX_HISTORY);
  }
}

export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Traduce el motivo simulado de la cuota a un mensaje legible para el usuario
function errorMessageFor(quotaReason) {
  if (quotaReason === "TOKENS") {
    return "Se agotó la cuota simulada de tokens de esta sesión. Reiniciá la página para renovarla.";
  }
  return "No se pudo enviar. Intentá de nuevo.";
}



// Si la cuota ya está en 0, bloquea el input/botón y muestra el aviso.
// Devuelve true si bloqueó (para que quien la llame corte la ejecución ahí mismo).
function lockIfQuotaExceeded() {
  if (isSessionQuotaExceeded()) {
    disableSendButton();
    disableInput();
    showError("Cuota de tokens de la sesión agotada (0 restantes). Reiniciá la página para renovarla.");
    return true;
  }
  return false;
}

export async function sendMessage(userText) {
  //  chequeo proactivo: ni siquiera intentamos si ya sabemos que no hay cuota
  if (lockIfQuotaExceeded()) return;
  if (isLoading) return;
  if (!userText.trim()) return;

  const currentPersona = PERSONAS[currentInstruction]
  const systemInstruction = currentPersona.instruction

  isLoading = true;
  disableSendButton();
  clearStatus()
  clearInput()
  contents.push({ role: "user", parts: [{ text: userText }] });
  trimHistory()
  renderMessages(contents, currentPersona.label, true); //  muestra "escribiendo..." mientras esperamos la respuesta


  const payload = buildPayload(contents, systemInstruction);

  try {
    const raw = await fetchGeminiAPI(payload);
    contents.push({ role: "model", parts: [{ text: normalizeAIResponse(raw) }] });
    trimHistory()
    renderMessages(contents, currentPersona.label);
    recordRealUsage(raw)
    updateTokenUsage(getSessionUsage())
  } catch (err) {
    if (err.status === 429) {
      renderMessages(contents) //* sacamos los puntos: no estamos "generando", estamos esperando el retry
      const secs = err.retryAfterSeconds ?? 5;
      showRetryState(secs);
      await wait(secs * 1000);
      try {
        const raw2 = await fetchGeminiAPI(payload);
        contents.push({ role: "model", parts: [{ text: normalizeAIResponse(raw2) }] });
        trimHistory()
        renderMessages(contents);
        recordRealUsage(raw2)
        updateTokenUsage(getSessionUsage())
        clearStatus()
      } catch (retryErr) {
        contents.pop(); //sacamos el mensaje de usuario que falló
        renderMessages(contents)
        showError(errorMessageFor(retryErr.quotaReason));
      }
    } else {
      renderMessages(contents)
      showError("Error inesperado.");
      console.error(err);
    }
  } finally {
    isLoading = false;
    enableSendButton();
    enableInput()
  }
   // re-chequeamos DESPUÉS del finally: si este mensaje fue el que agotó
  // la cuota, sobreescribimos el enable de arriba y bloqueamos de nuevo.
  lockIfQuotaExceeded();
}

export function setSystemInstruction(instruction) {
  if(!PERSONAS[instruction]) return;
  currentInstruction = instruction;
  contents = [];         // reset del historial al cambiar de personaje
  renderMessages(contents);
  clearStatus()
}

const debouncedSend = debounce(sendMessage, 300)

/**
 * Conecta el motor a los elementos del DOM que renderChat() ya insertó
 * dentro de #app. Se llama una vez, después de setear el innerHTML.
 */
export function initChatEngine() {
  // reset de estado cada vez que se (re)monta la vista
  contents = [];
  currentInstruction = DEFAULT_PERSONA_KEY;
 
  const sendButton = document.getElementById("send-btn");
  const inputEl = document.getElementById("chat-input");
  const personaSelect = document.getElementById("persona-select");
 
  if (!sendButton || !inputEl) return;
 
  sendButton.addEventListener("click", () => debouncedSend(inputEl.value));
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") debouncedSend(inputEl.value);
  });
 
  if (personaSelect) {
    personaSelect.addEventListener("change", (e) => {
      // changePersona(e.target.value);
      setSystemInstruction(e.target.value)
    });
  }
  contents.push({ role: "model", parts: [{ text:"Hmph… ¿Quién te dio autorización para interrumpir mi entrenamiento, miserable insecto ? Habla de una vez y ¡Y más te vale que sea algo importante!." }] })
  renderMessages(contents, PERSONAS[currentInstruction].label);
  updateTokenUsage(getSessionUsage());
  lockIfQuotaExceeded()// por si la cuota ya estaba agotada de antes en esta misma sesión de página
}
 
export { PERSONAS };