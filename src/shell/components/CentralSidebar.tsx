import React from "react";
import { translate } from "../../localization/index";
import { buildGroupedProductNavigation } from "../navigation-model";
import type { ShellNavigationEntry } from "../types";
import { labelFor } from "../labels";

export interface CentralSidebarProps {
  globalItems: ShellNavigationEntry[];
  productItems?: ShellNavigationEntry[];
  productName?: string;
  language: "en" | "es";
  collapsed?: boolean;
  onNavigate?: (route: string) => void;
  onToggleCollapsed?: () => void;
}

export function CentralSidebar({
  globalItems, productItems = [], productName, language, collapsed = false,
  onNavigate, onToggleCollapsed,
}: CentralSidebarProps) {
  const productGroups = buildGroupedProductNavigation(productItems);
  const locale = language === "es" ? "es-US" : "en-US";
  const t = (key: string) => translate(key, locale);
  return (
    <aside className={`pactus-sidebar${collapsed ? " is-collapsed" : ""}`}>
      <div className="pactus-brand">
        <div className="pactus-brand-mark" aria-hidden="true">P</div>
        {!collapsed && <div><strong>PactUS Pro</strong><span>{t("shell.brand.platform")}</span></div>}
        <button type="button" className="pactus-collapse-button" onClick={onToggleCollapsed}
          aria-label={t(collapsed ? "shell.navigation.expand" : "shell.navigation.collapse")}>
          {collapsed ? ">" : "<"}
        </button>
      </div>
      <nav className="pactus-global-nav" aria-label={t("shell.navigation.global.aria")}>
        {globalItems.map((item) => (
          <button key={item.id} type="button" className={`pactus-nav-item${item.active ? " is-active" : ""}`}
            onClick={() => onNavigate?.(item.route)}
            title={collapsed ? labelFor(item.labelKey, language) : undefined}>
            <span className="pactus-nav-icon" aria-hidden="true">•</span>
            {!collapsed && <span>{labelFor(item.labelKey, language)}</span>}
          </button>
        ))}
      </nav>
      {!collapsed && productGroups.length > 0 && (
        <section className="pactus-product-nav">
          <div className="pactus-section-label">{productName ?? "Product"}</div>
          {productGroups.map((group) => (
            <div key={group.id} className="pactus-product-group">
              <div className="pactus-product-group-label">{labelFor(group.labelKey, language)}</div>
              {group.items.map((item) => (
                <button key={item.id} type="button"
                  className={`pactus-nav-item pactus-product-item${item.active ? " is-active" : ""}`}
                  disabled={item.disabled} onClick={() => !item.disabled && onNavigate?.(item.route)}>
                  <span>{labelFor(item.labelKey, language)}</span>{item.badge && <small>{item.badge}</small>}
                </button>
              ))}
            </div>
          ))}
        </section>
      )}
    </aside>
  );
}
