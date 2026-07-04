# AI chatbot plugin for Starlight

Ask AI chatbot plugin for [Starlight](https://starlight.astro.build) sites, powered by [Biel.ai](https://biel.ai).

![AI chatbot Starlight](https://docs.biel.ai/assets/images/biel-widget-docs-bd28548cf26a37bcb7c496487280bbfe.png)

Add an AI chatbot to your Starlight documentation using Biel.ai's plugin. The integration adds both chat and search capabilities to your site. No component overrides needed.

*Note: A Biel.ai plan is required to use this plugin. Try it free for 14 days—no credit card required.*

## Key features

- AI chatbot that provides instant responses to documentation queries.
- AI search engine for quick and relevant information retrieval.
- Native Starlight plugin, no component overrides required.
- Customizable to match your site's branding and user needs.

## Installation

```bash
npm install starlight-biel
```

Add the plugin to your `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightBiel from 'starlight-biel'

export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      plugins: [
        starlightBiel({
          project: '<YOUR_PROJECT_ID>',
          headerTitle: 'Biel.ai chatbot',
        }),
      ],
    }),
  ],
})
```

Replace `<YOUR_PROJECT_ID>` with your project's ID from the [Biel.ai dashboard](https://app.biel.ai).

Run `npm run dev` and verify the chat button appears in the bottom-right corner.

## Configuration

All widget options are supported as camelCase keys, for example:

```js
starlightBiel({
  project: '<YOUR_PROJECT_ID>',
  bielButtonText: 'Ask AI',
  buttonPosition: 'bottom-right',
  modalPosition: 'bottom-right',
  buttonStyle: 'dark',
  headerTitle: 'Documentation AI',
})
```

Set `enable: false` to turn the widget off without removing the configuration.

## Get started

See the [Starlight AI chatbot integration guide](https://docs.biel.ai/installation/starlight) for the full list of options and setup instructions.

## Support

Need assistance? [Contact us](https://docs.biel.ai/support) for help.

## License

Copyright (c) 2024 Biel.ai

Licensed under the [MIT License](LICENSE).
