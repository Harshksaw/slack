
import globals from "globals";
import { defineConfig } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"],
  plugins: { "simple-import-sort":simpleImportSort },
   extends: ["js/recommended"], languageOptions: { globals: globals.node } },

]);
