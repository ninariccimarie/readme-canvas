import { Button } from "@readme-canvas/ui";

export function App() {
  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col justify-center gap-4 px-6">
      <h1 className="text-3xl font-semibold tracking-tight">README Canvas</h1>
      <p className="text-lg text-muted-foreground">
        Visual builder for GitHub profile READMEs.
      </p>
      <div>
        <Button type="button">Get started</Button>
      </div>
    </main>
  );
}
