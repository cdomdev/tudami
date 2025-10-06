"use client";

import { create } from "zustand";

type ApplyOfferEvent = {
  offer_id: number;
  action: "apply" | "withdraw";
  user_id: string;
  timestamp: number;
};

type ApplyOfferEventsStore = {
  emitApplyOfferEvent: (offer_id: number, action: "apply" | "withdraw", user_id: string) => void;
  onApplyOfferEvent: (callback: (event: ApplyOfferEvent) => void) => () => void;
};

// Clase emisora en memoria
class ApplyOfferEventEmitter {
  private listeners: Array<(event: ApplyOfferEvent) => void> = [];

  emit(offer_id: number, action: "apply" | "withdraw", user_id: string) {
    const event: ApplyOfferEvent = {
      offer_id,
      action,
      user_id,
      timestamp: Date.now(),
    };
    this.listeners.forEach((callback) => callback(event));
  }

  subscribe(callback: (event: ApplyOfferEvent) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== callback);
    };
  }
}

const globalApplyOfferEmitter = new ApplyOfferEventEmitter();

export const useApplyOfferEventsStore = create<ApplyOfferEventsStore>(() => ({
  emitApplyOfferEvent: (offer_id, action, user_id) => {
    globalApplyOfferEmitter.emit(offer_id, action, user_id);
  },
  onApplyOfferEvent: (callback) => {
    return globalApplyOfferEmitter.subscribe(callback);
  },
}));
