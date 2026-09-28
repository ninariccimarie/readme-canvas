/// <reference types="vite/client" />

import type { Integration } from "@readme-canvas/core";

interface IntegrationModule {
  integration: Integration;
}

const modules = import.meta.glob<IntegrationModule>("./*/index.ts", {
  eager: true,
});

export function discoverIntegrations(): Integration[] {
  return Object.values(modules)
    .map((module) => module.integration)
    .filter((integration): integration is Integration => integration != null)
    .sort((left, right) => left.id.localeCompare(right.id));
}
