import { polyfillNode, PolyfillNodeOptions } from "esbuild-plugin-polyfill-node";
import RollupPluginNodePolyfill from "rollup-plugin-node-polyfills";
import { NodePolyfillsOptions } from "rollup-plugin-node-polyfills/dist/types/modules";
import type { PluginOption } from "vite";

export const PLUGIN_NAME = "vite-node-resolve";

export interface ViteNodeResolveConfig {
  defineGlobal?: boolean;
  nodeModulesOptions?: PolyfillNodeOptions;
  rollupPolyfillOptions?: NodePolyfillsOptions;
}

export default function ViteNodeResolve({ defineGlobal = true, nodeModulesOptions = {}, rollupPolyfillOptions = {} }: ViteNodeResolveConfig): PluginOption {
  return {
    name: PLUGIN_NAME,
    config: () => ({
      build: {
        rollupOptions: {
          plugins: [RollupPluginNodePolyfill(rollupPolyfillOptions)],
        },
      },
      optimizeDeps: {
        esbuildOptions: {
          define: {
            ...(defineGlobal ? { global: "globalThis" } : null),
          },
          plugins: [polyfillNode(nodeModulesOptions)],
        },
      },
    }),
  } as unknown as PluginOption;
}
