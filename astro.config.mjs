import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  env:{
    REACT_APP_SECRET_PASSWORD: import.meta.env.PUBLIC_SECRET_PASSWORD,
  }
});