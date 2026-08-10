import { beforeEach, describe, expect, it } from "vitest";
import {
    getSessionUsage,
    isSessionQuotaExceeded,
    recordUsage,
    resetSessionUsage
} from "../src/services/quotaSimulator.js";

describe("quotaSimulator", () => {
  beforeEach(() => {
    resetSessionUsage(); // 🔑 clave: arrancamos cada test desde cero
  });

  it("no excede la cuota recién iniciada", () => {
    expect(isSessionQuotaExceeded()).toBe(false);
  });

  it("marca la cuota como excedida al llegar al límite", () => {
    recordUsage(2000, 2000); // suma exactamente 4000
    expect(isSessionQuotaExceeded()).toBe(true);
  });

  it("acumula el uso entre múltiples llamadas", () => {
    recordUsage(100, 50);
    recordUsage(200, 100);
    const usage = getSessionUsage();
    expect(usage.totalTokens).toBe(450);
  });

  it("también marca excedida si se pasa del límite exacto", () => {
    recordUsage(3000, 3000); //* 6000, muy por encima de 4000
    expect(isSessionQuotaExceeded()).toBe(true);
  });
});