import { Button } from "@readme-canvas/ui";
import { useCanvasStore } from "../canvas/store";
import { fieldClassName } from "./fields";

export function ProfileImport() {
  const usernameInput = useCanvasStore((state) => state.usernameInput);
  const status = useCanvasStore((state) => state.status);
  const errorMessage = useCanvasStore((state) => state.errorMessage);
  const profile = useCanvasStore((state) => state.profile);
  const setUsernameInput = useCanvasStore((state) => state.setUsernameInput);
  const importProfile = useCanvasStore((state) => state.importProfile);

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        void importProfile();
      }}
    >
      <label className="text-sm font-medium">
        GitHub username
        <input
          className={fieldClassName}
          value={usernameInput}
          autoComplete="username"
          spellCheck={false}
          onChange={(event) => setUsernameInput(event.target.value)}
        />
      </label>
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Importing…" : "Import profile"}
      </Button>
      {status === "error" && errorMessage ? (
        <p role="alert" className="text-sm text-destructive">
          {errorMessage}
        </p>
      ) : null}
      {profile ? (
        <p className="text-sm text-muted-foreground">
          Imported {profile.name ?? profile.username} (@{profile.username})
        </p>
      ) : null}
    </form>
  );
}
