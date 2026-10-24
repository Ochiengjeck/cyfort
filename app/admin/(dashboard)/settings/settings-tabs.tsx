"use client";

import { useState } from "react";

type SettingsTabsProps = {
  general: React.ReactNode;
  theme: React.ReactNode;
};

export function SettingsTabs({ general, theme }: SettingsTabsProps) {
  const [tab, setTab] = useState<"general" | "theme">("general");

  return (
    <div>
      <div className="mb-6 flex gap-1 border-b border-white/10">
        {(["general", "theme"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
              tab === value
                ? "border-b-2 border-brand-gold text-brand-gold"
                : "text-white/50 hover:text-white"
            }`}
          >
            {value}
          </button>
        ))}
      </div>
      <div hidden={tab !== "general"}>{general}</div>
      <div hidden={tab !== "theme"}>{theme}</div>
    </div>
  );
}
