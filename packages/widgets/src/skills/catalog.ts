export interface SkillCatalogEntry {
  id: string;
  name: string;
  logo: string;
}

export const SKILL_CATALOG: readonly SkillCatalogEntry[] = [
  { id: "typescript", name: "TypeScript", logo: "typescript" },
  { id: "javascript", name: "JavaScript", logo: "javascript" },
  { id: "react", name: "React", logo: "react" },
  { id: "nodejs", name: "Node.js", logo: "nodedotjs" },
  { id: "python", name: "Python", logo: "python" },
  { id: "go", name: "Go", logo: "go" },
  { id: "rust", name: "Rust", logo: "rust" },
  { id: "html", name: "HTML", logo: "html5" },
  { id: "css", name: "CSS", logo: "css" },
];
