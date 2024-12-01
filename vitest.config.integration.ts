import swc from "unplugin-swc";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [swc.vite({ module: { type: "es6" } })],
  test: {
    root: "./",
    globals: true,
    isolate: false,
    passWithNoTests: true,
    include: [`tests/integration/**/*.test.ts`],
    env: loadEnv("test", process.cwd(), ""),
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: `coverage/integration`,
      include: ["src/**/*.ts"],
      exclude: ["src/main.ts"],
    },
    globalSetup: "tests/integration/global-setup.ts",
    setupFiles: ["tests/integration/setup-tests.ts"],
  },
});
