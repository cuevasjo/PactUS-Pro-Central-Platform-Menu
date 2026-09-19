import React, { type ReactNode, useMemo, useState } from "react";

import {
  buildGlobalShellNavigation,
  buildProductShellNavigation,
} from "../navigation-model";
import type { ShellContext } from "../types";
import { CentralHeader } from "./CentralHeader";
import { CentralSidebar } from "./CentralSidebar";
import "../styles/central-shell.css";

export interface CentralAppShellProps {
  context: ShellContext;
  children: ReactNode;
  timerText?: string;
  timerRunning?: boolean;
  onNavigate?: (route: string) => void;
  onHelp?: () => void;
  onTimer?: () => void;
  onLanguageChange?: (language: "en" | "es") => void;
}

export function CentralAppShell({
  context,
  children,
  timerText,
  timerRunning,
  onNavigate,
  onHelp,
  onTimer,
  onLanguageChange,
}: CentralAppShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  const globalItems = useMemo(
    () => buildGlobalShellNavigation(context.authorization, context.activeRoute),
    [context.authorization, context.activeRoute],
  );

  const productItems = useMemo(
    () =>
      context.activeProduct
        ? buildProductShellNavigation(
            context.authorization,
            context.activeProduct,
            context.activeRoute,
          )
        : [],
    [context.authorization, context.activeProduct, context.activeRoute],
  );

  return (
    <div className="pactus-shell">
      <CentralSidebar
        globalItems={globalItems}
        productItems={productItems}
        productName={context.activeProduct?.toUpperCase()}
        language={context.language}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((value) => !value)}
        onNavigate={onNavigate}
      />

      <div className="pactus-main">
        <CentralHeader
          user={context.user}
          language={context.language}
          timerText={timerText}
          timerRunning={timerRunning}
          onHelp={onHelp}
          onTimer={onTimer}
          onLanguageChange={onLanguageChange}
        />
        <main className="pactus-content">{children}</main>
      </div>
    </div>
  );
}
