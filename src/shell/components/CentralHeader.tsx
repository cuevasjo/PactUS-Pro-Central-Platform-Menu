import React from "react";

import type { ShellUser } from "../types";

export interface CentralHeaderProps {
  user: ShellUser;
  language: "en" | "es";
  timerText?: string;
  timerRunning?: boolean;
  onLanguageChange?: (language: "en" | "es") => void;
  onHelp?: () => void;
  onTimer?: () => void;
}

export function CentralHeader({
  user,
  language,
  timerText = "00:00:00",
  timerRunning = false,
  onLanguageChange,
  onHelp,
  onTimer,
}: CentralHeaderProps) {
  return (
    <header className="pactus-header">
      <div className="pactus-search">
        <span aria-hidden="true">⌕</span>
        <input
          aria-label="Search PactUS Pro"
          placeholder={language === "es" ? "Buscar en PactUS Pro..." : "Search PactUS Pro..."}
        />
      </div>

      <div className="pactus-header-actions">
        <button
          type="button"
          className={`pactus-timer${timerRunning ? " is-running" : ""}`}
          onClick={onTimer}
          aria-label="Time and Billing timer"
        >
          <span aria-hidden="true">◷</span>
          <strong>{timerText}</strong>
        </button>

        <button type="button" className="pactus-help-button" onClick={onHelp} aria-label="Contextual help">
          ?
        </button>

        <select
          aria-label="Language"
          value={language}
          onChange={(event) => onLanguageChange?.(event.target.value as "en" | "es")}
        >
          <option value="en">EN</option>
          <option value="es">ES</option>
        </select>

        <div className="pactus-user">
          <div className="pactus-avatar">
            {user.name
              .split(/\s+/)
              .slice(0, 2)
              .map((part) => part[0]?.toUpperCase())
              .join("")}
          </div>
          <div>
            <strong>{user.name}</strong>
            {user.organizationName && <span>{user.organizationName}</span>}
          </div>
        </div>
      </div>
    </header>
  );
}
