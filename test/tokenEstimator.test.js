import { describe, expect, it } from "vitest";
import { estimateContentsTokens, estimateTokens } from "../src/services/tokenEstimator.js";

describe("estimateTokens", () => {
  it("redondea hacia arriba (~4 caracteres por token)", () => {
    expect(estimateTokens("hola")).toBe(1);      // 4 caracteres → 1 token
    expect(estimateTokens("hola mundo")).toBe(3); // 10 caracteres → ceil(2.5) = 3
  });

  it("devuelve 0 si el texto está vacío o es undefined", () => {
    expect(estimateTokens("")).toBe(0);
    expect(estimateTokens(undefined)).toBe(0);
  });
});

describe("estimateContentsTokens", () => {
  it("suma los tokens de todos los mensajes del array", () => {
    const contents = [
      { role: "user", parts: [{ text: "hola" }] },       // 1 token
      { role: "model", parts: [{ text: "hola mundo" }] } // 3 tokens
    ];
    expect(estimateContentsTokens(contents)).toBe(4);
  });
});