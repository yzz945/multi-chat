import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import manifest from './manifest.config'
import debug from "vite-plugin-debug"

export default defineConfig(({ mode }) => {
    return {
        plugins: [
            tsconfigPaths(),
            react({
                babel: {
                    plugins: [jotaiDebugLabel, jotaiReactRefresh],
                },
            }),
            crx({ manifest }),
            debug()
        ],
        build: {
            rollupOptions: {
                input: ['app.html']
            },
            sourcemap:true
        },
        esbuild: {
            drop: mode === 'production' ? ['console', 'debugger'] : [],
        },
        server: {
            strictPort: true,
            port: 5173,
            hmr: {
                clientPort: 5173,
            },
        },
    }
})
