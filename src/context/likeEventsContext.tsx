"use client";

import { create } from "zustand";

type LikeEvent = {
  question_id: number;
  action: "add" | "remove";
  timestamp: number;
};

type LikeEventStore = {
  emitLikeEvent: (question_id: number, action: "add" | "remove") => void;
  onLikeEvent: (callback: (event: LikeEvent) => void) => () => void;
};

// Clase emisora de eventos en memoria
class LikeEventEmitter {
  private listeners: Array<(event: LikeEvent) => void> = [];

  emit(question_id: number, action: "add" | "remove") {
    const event: LikeEvent = {
      question_id,
      action,
      timestamp: Date.now(),
    };
    this.listeners.forEach((callback) => callback(event));
  }

  subscribe(callback: (event: LikeEvent) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== callback);
    };
  }
}

// Instancia global única
const globalLikeEmitter = new LikeEventEmitter();

// Store con Zustand
export const useLikeEventsStore = create<LikeEventStore>(() => ({
  emitLikeEvent: (question_id, action) => {
    globalLikeEmitter.emit(question_id, action);
  },
  onLikeEvent: (callback) => {
    return globalLikeEmitter.subscribe(callback);
  },
}));
