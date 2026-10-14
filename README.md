# AI assistant plugin for Starlight

AI assistant plugin for [Starlight](https://starlight.astro.build) sites, with an **Ask AI** button powered by [Biel.ai](https://biel.ai).

![AI assistant Starlight](https://docs.biel.ai/assets/images/biel-widget-docs-bd28548cf26a37bcb7c496487280bbfe.png)

Add an AI assistant to your Starlight documentation using Biel.ai's plugin. The integration embeds the Ask AI button without component overrides. Configure the documentation search widget separately.

*Note: A Biel.ai plan is required to use this plugin. Try it free for 14 days—no credit card required.*

## Key features

- **Ask AI** button that opens an AI assistant to answer questions from your documentation.
- **Documentation search** to find matching pages from indexed docs with a separately configured search widget.
- Connect menu to link the same indexed docs to Claude Code, Codex, and other compatible AI clients via [Biel.ai's hosted MCP server](https://docs.biel.ai/integrations/mcp-server).
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

See the [Starlight AI assistant integration guide](https://docs.biel.ai/installation/starlight) for the full list of options and setup instructions.

## Support

Need assistance? [Contact us](https://docs.biel.ai/support) for help.

## License

Copyright (c) 2024 Biel.ai

Licensed under the [MIT License](LICENSE).
