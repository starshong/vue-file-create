import { UserConfig } from "./config/types";

export default function defineConfig(options: UserConfig) {
  return {
    root: 'src/views',
    ...options,
  }
}