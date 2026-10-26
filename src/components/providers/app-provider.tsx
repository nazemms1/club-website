"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { Check } from "lucide-react";
import { RouteProgress } from "@/components/motion/route-progress";
import type { SessionUser } from "@/lib/types";

const STORAGE_KEY = "maison-commune:v1";

interface StoredState {
  user: SessionUser | null;
  rsvps: string[];
  joined: string[];
}

// Seed data so the member dashboard has something to show before anyone interacts.
const seedState: StoredState = {
  user: null,
  rsvps: ["blind-tasting-italian-reds", "sauna-and-soup", "winter-gala"],
  joined: ["literary-salon", "cold-water"],
};

// A tiny external store backed by localStorage. useSyncExternalStore renders the seed state on the
// server and during hydration, then switches to the saved state on the client without a mismatch.
const listeners = new Set<() => void>();
let cached: StoredState | null = null;

function getState(): StoredState {
  if (cached) return cached;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cached = raw ? { ...seedState, ...(JSON.parse(raw) as Partial<StoredState>) } : seedState;
  } catch {
    // Storage can be blocked (private windows). The prototype then runs on seed data.
    cached = seedState;
  }
  return cached;
}

function setState(update: (current: StoredState) => StoredState) {
  cached = update(getState());
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cached));
  } catch {
    // Ignore write failures. State still works for this visit.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const noopSubscribe = () => () => {};
const isReady = () => true;
const notReady = () => false;

const actions = {
  signIn: (user: SessionUser) => setState((current) => ({ ...current, user })),
  signOut: () => setState((current) => ({ ...current, user: null })),
  updateUser: (patch: Partial<SessionUser>) =>
    setState((current) => (current.user ? { ...current, user: { ...current.user, ...patch } } : current)),
  toggleRsvp: (eventSlug: string) =>
    setState((current) => ({
      ...current,
      rsvps: current.rsvps.includes(eventSlug)
        ? current.rsvps.filter((slug) => slug !== eventSlug)
        : [...current.rsvps, eventSlug],
    })),
  toggleClub: (clubSlug: string) =>
    setState((current) => ({
      ...current,
      joined: current.joined.includes(clubSlug)
        ? current.joined.filter((slug) => slug !== clubSlug)
        : [...current.joined, clubSlug],
    })),
};

type AppActions = typeof actions;

interface Toast {
  id: number;
  message: string;
}

type AppContextValue = StoredState &
  AppActions & {
    /** False until the browser has loaded saved state, so guarded pages do not flash. */
    ready: boolean;
    notify: (message: string) => void;
  };

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getState, () => seedState);
  const ready = useSyncExternalStore(noopSubscribe, isReady, notReady);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const value = useMemo<AppContextValue>(() => ({ ...state, ready, ...actions, notify }), [state, ready, notify]);

  return (
    <AppContext.Provider value={value}>
      {/* reducedMotion="user" turns off transform animations for people who ask for less motion. */}
      <MotionConfig reducedMotion="user">
        <RouteProgress />
        {children}
        <div aria-live="polite" className="pointer-events-none fixed right-4 bottom-4 z-[100] flex flex-col items-end gap-3 md:right-6 md:bottom-6">
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 rounded-full bg-ink px-5 py-3 text-sm text-paper shadow-xl"
              >
                <Check className="size-4 text-brass" aria-hidden="true" />
                {toast.message}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </MotionConfig>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return context;
}
