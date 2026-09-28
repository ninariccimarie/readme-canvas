export class GitHubProfileError extends Error {
  readonly status: number | null;

  constructor(message: string, status: number | null, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "GitHubProfileError";
    this.status = status;
  }
}
