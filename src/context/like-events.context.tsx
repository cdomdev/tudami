"use client"

import { createContext, useContext, ReactNode } from "react";

type LikeEvent = {
  question_id: number;
  action: 'add' | 'remove';
  timestamp: number;
};

type LikeEventContextType = {
  emitLikeEvent: (question_id: number, action: 'add' | 'remove') => void;
  onLikeEvent: (callback: (event: LikeEvent) => void) => () => void;
};

const LikeEventContext = createContext<LikeEventContextType | null>(null);

class LikeEventEmitter {
  private listeners: Array<(event: LikeEvent) => void> = [];

  emit(question_id: number, action: 'add' | 'remove') {
    const event: LikeEvent = {
      question_id,
      action,
      timestamp: Date.now()
    };    
    this.listeners.forEach(callback => callback(event));
  }

  subscribe(callback: (event: LikeEvent) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }
}

const globalLikeEmitter = new LikeEventEmitter();

export function LikeEventProvider({ children }: { children: ReactNode }) {
  const emitLikeEvent = (question_id: number, action: 'add' | 'remove') => {
    globalLikeEmitter.emit(question_id, action);
  };

  const onLikeEvent = (callback: (event: LikeEvent) => void) => {
    return globalLikeEmitter.subscribe(callback);
  };

  return (
    <LikeEventContext.Provider value={{ emitLikeEvent, onLikeEvent }}>
      {children}
    </LikeEventContext.Provider>
  );
}

export function useLikeEvents() {
  const context = useContext(LikeEventContext);
  if (!context) {
    throw new Error('useLikeEvents must be used within a LikeEventProvider');
  }
  return context;
}
