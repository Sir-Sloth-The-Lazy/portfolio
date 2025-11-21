import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {resolve , dirname} from "path" 
import {fileURLToPath} from "url"

const __dirname = dirname(fileURLToPath(import.meta.url)) 

export default defineConfig({
  plugins: [react() , tailwindcss()],
  resolve : {
    alias : {
      '#components' : resolve(__dirname, "components"),
      '#constants' : resolve(__dirname , "constants"),
      '#store' : resolve (__dirname , "store"),
      '#hoc' : resolve(__dirname , "hoc" ) ,
      '#windows' : resolve(__dirname , "windows" )
    }
  }
})
