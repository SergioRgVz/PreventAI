import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [
      '@emotion/react', 
      '@emotion/styled', 
      '@mui/material/Tooltip'
    ],
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
        
      },
    }),
    svgr({
      exportAsDefault: true,
    }),
  ],
  build: { chunkSizeWarningLimit: 1600, sourcemap: true},
  server: {
    port: 5173,
    sourcemap:true,
  },
})


