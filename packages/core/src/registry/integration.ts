import type { IntegrationId } from "../domain/ids";
import type { SetupStep } from "../domain/setup";
import type { Theme } from "../domain/theme";
import type { IntegrationContext } from "./context";

export interface Integration {
  id: IntegrationId;
  name: string;
  docsUrl?: string;
  supportsTheming: boolean;
  setupInstructions: (ctx: IntegrationContext) => SetupStep[];
  resolveTheme?: (theme: Theme) => string;
}

export type IntegrationRegistry = ReadonlyMap<IntegrationId, Integration>;
