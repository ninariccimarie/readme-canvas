import { useEffect } from "react";
import { useCanvasStore } from "../canvas/store";
import { Controls } from "./Controls";
import { MarkdownPane } from "./MarkdownPane";
import { PreviewPane } from "./PreviewPane";

export function Shell() {
  const mode = useCanvasStore((state) => state.mode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return (
    <div className="grid min-h-svh grid-cols-1 lg:h-svh lg:grid-cols-[minmax(20rem,24rem)_minmax(0,1fr)_minmax(0,1fr)] lg:overflow-hidden">
      <Controls />
      <PreviewPane />
      <MarkdownPane />
    </div>
  );
}
