// "use client";

// import { create } from "zustand";

// type LikeEvent = {
//   question_id: number;
//   action: "add" | "remove";
//   timestamp: number;
// };

// type LikeEventStore = {
//   emitLikeEvent: (question_id: number, action: "add" | "remove") => void;
//   onLikeEvent: (callback: (event: LikeEvent) => void) => () => void;
// };

// // Clase emisora de eventos en memoria
// class LikeEventEmitter {
//   private listeners: Array<(event: LikeEvent) => void> = [];

//   emit(question_id: number, action: "add" | "remove") {
//     const event: LikeEvent = {
//       question_id,
//       action,
//       timestamp: Date.now(),
//     };
//     this.listeners.forEach((callback) => callback(event));
//   }

//   subscribe(callback: (event: LikeEvent) => void) {
//     this.listeners.push(callback);
//     return () => {
//       this.listeners = this.listeners.filter(
//         (listener) => listener !== callback
//       );
//     };
//   }
// }

// // Instancia global única
// const globalLikeEmitter = new LikeEventEmitter();

// // Store con Zustand
// export const useLikeEventsStore = create<LikeEventStore>(() => ({
//   emitLikeEvent: (question_id, action) => {
//     globalLikeEmitter.emit(question_id, action);
//   },
//   onLikeEvent: (callback) => {
//     return globalLikeEmitter.subscribe(callback);
//   },
// }));

"use client";

import { create } from "zustand";
import { useEffect } from "react";

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
  private bc: BroadcastChannel;

  constructor(channelName: string) {
    this.bc = new BroadcastChannel(channelName);
    this.bc.onmessage = (e) => {
      const event = e.data as LikeEvent;
      this.notify(event);
    };
  }

  private notify(event: LikeEvent) {
    this.listeners.forEach((callback) => callback(event));
  }

  emit(question_id: number, action: "add" | "remove") {
    const event: LikeEvent = {
      question_id,
      action,
      timestamp: Date.now(),
    };
    // Notifica en la misma pestaña
    this.notify(event);
    // Notifica a otras pestañas
    this.bc.postMessage(event);
  }

  subscribe(callback: (event: LikeEvent) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== callback
      );
    };
  }
}

// Instancia global única con canal compartido
const globalLikeEmitter = new LikeEventEmitter("like-events-channel");

// Store con Zustand
export const useLikeEventsStore = create<LikeEventStore>(() => ({
  emitLikeEvent: (question_id, action) => {
    globalLikeEmitter.emit(question_id, action);
  },
  onLikeEvent: (callback) => {
    return globalLikeEmitter.subscribe(callback);
  },
}));

// 🔹 Hook para suscribirse automáticamente a eventos
export function useLikeEvent(callback: (event: LikeEvent) => void) {
  const onLikeEvent = useLikeEventsStore((s) => s.onLikeEvent);

  // Manejo automático del unsubscribe
  useEffect(() => {
    const unsubscribe = onLikeEvent(callback);
    return unsubscribe;
  }, [onLikeEvent, callback]);
}
