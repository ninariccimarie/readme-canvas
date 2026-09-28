import type { ThemeFamily } from "../family";
import { dark } from "./dark";
import { light } from "./light";

export const family: ThemeFamily = {
  id: "github",
  name: "GitHub",
  tokens: { light, dark },
};
