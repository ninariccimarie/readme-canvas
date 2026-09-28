import { Button } from "@readme-canvas/ui";
import { useState } from "react";
import { widgetRegistry } from "../canvas/registry";
import { composeDocumentMarkdown } from "../canvas/state";
import { useCanvasStore } from "../canvas/store";

export function MarkdownPane() {
  const profile = useCanvasStore((state) => state.profile);
  const familyId = useCanvasStore((state) => state.familyId);
  const mode = useCanvasStore((state) => state.mode);
  const layout = useCanvasStore((state) => state.layout);
  const markdown = composeDocumentMarkdown(
    { profile, familyId, mode, layout },
    widgetRegistry,
  );
  const [copied, setCopied] = useState(false);

  async function copyMarkdown() {
    if (!markdown) {
      return;
    }

    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section
      aria-label="Generated Markdown"
      className="flex min-h-0 flex-col border-t border-border bg-muted/30 lg:border-t-0 lg:border-l"
    >
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Markdown
        </h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!markdown}
          onClick={() => void copyMarkdown()}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="min-h-0 flex-1 overflow-auto p-4 text-xs leading-relaxed whitespace-pre-wrap">
        <code>{markdown || "(empty)"}</code>
      </pre>
    </section>
  );
}
