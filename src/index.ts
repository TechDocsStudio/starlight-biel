/**
 * Ask AI chatbot plugin for Starlight, powered by Biel.ai.
 *
 * (c) 2024 - present Biel.ai
 * This code is licensed under MIT license (see LICENSE for details).
 */

export interface BielOptions {
  enable?: boolean
  project?: string
  version?: string

  // biel-button
  aiIcon?: string
  apiKey?: string
  bielButtonText?: string
  buttonPosition?: string
  buttonStyle?: string
  customFont?: boolean
  metadata?: string
  hideAvatars?: boolean
  hideIcon?: boolean

  // biel-bot
  disableInput?: boolean
  email?: string
  expandModal?: boolean
  hideCloseButton?: boolean
  hideConnectButton?: boolean
  hideExpandButton?: boolean
  hideRefreshButton?: boolean
  hideSettingsButton?: boolean
  hideFeedback?: boolean
  hideSources?: boolean
  hideTooltips?: boolean
  keepConversation?: boolean
  mcpServerUrl?: string
  modalPosition?: string
  showTermsModal?: boolean
  thinkModeEnabled?: boolean

  // biel-bot text
  assistantLabel?: string
  closeButtonText?: string
  collapseButtonText?: string
  connectButtonText?: string
  errorMessage403?: string
  errorMessage404?: string
  errorMessageDefault?: string
  expandButtonText?: string
  footerText?: string
  headerTitle?: string
  inputPlaceholderText?: string
  mcpClaudeDescription?: string
  mcpClaudeText?: string
  mcpCopiedText?: string
  mcpCopilotDescription?: string
  mcpCopilotText?: string
  mcpCursorDescription?: string
  mcpCursorText?: string
  mcpUrlCopiedDescription?: string
  mcpClaudeCopiedDescription?: string
  mcpUrlDescription?: string
  mcpUrlText?: string
  refreshButtonText?: string
  sendButtonText?: string
  settingsButtonText?: string
  sourcesText?: string
  suggestedQuestions?: string
  suggestedQuestionsTitle?: string
  termsCheckboxText?: string
  termsDescription?: string
  termsTitle?: string
  thinkModeAutoDescription?: string
  thinkModeAutoText?: string
  thinkModeFastDescription?: string
  thinkModeFastText?: string
  thinkModeThinkDescription?: string
  thinkModeThinkText?: string
  welcomeMessage?: string
}

export const DEFAULT_OPTIONS: BielOptions = {
  bielButtonText: 'Ask AI',
  modalPosition: 'bottom-right',
  buttonStyle: 'dark',
  buttonPosition: 'bottom-right',
  enable: true,
}

// Minimal structural types so the plugin compiles without depending on
// @astrojs/starlight at build time. Starlight validates the real shapes.
interface HeadEntry {
  tag: string
  attrs?: Record<string, string | boolean | undefined>
  content?: string
}

interface StarlightPluginContext {
  config: { head?: HeadEntry[] }
  updateConfig(config: { head?: HeadEntry[] }): void
  logger: { warn(message: string): void }
}

export interface StarlightBielPlugin {
  name: string
  hooks: {
    'config:setup'(context: StarlightPluginContext): void
  }
}

function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
}

function escapeJs(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/<\//g, '<\\/')
}

function generateBielScript(options: BielOptions): string {
  const { project, bielButtonText, enable, version, ...bielProps } = options

  let scriptContent = `
    window.addEventListener('DOMContentLoaded', function () {
      var bielButton = document.createElement('biel-button');
      bielButton.setAttribute('project', '${escapeJs(project || '')}');
  `

  Object.entries(bielProps).forEach(([key, value]) => {
    if (value !== undefined) {
      scriptContent += `
      bielButton.setAttribute('${camelToKebab(key)}', '${escapeJs(value.toString())}');
      `
    }
  })

  scriptContent += `
      bielButton.textContent = '${escapeJs(bielButtonText || DEFAULT_OPTIONS.bielButtonText!)}';
      document.body.appendChild(bielButton);
    });
  `

  return scriptContent
}

export default function starlightBiel(userOptions: BielOptions = {}): StarlightBielPlugin {
  const options: BielOptions = { ...DEFAULT_OPTIONS, ...userOptions }
  const version = options.version || 'latest'

  return {
    name: 'starlight-biel',
    hooks: {
      'config:setup'({ config, updateConfig, logger }) {
        if (!options.enable) {
          return
        }
        if (!options.project) {
          logger.warn(
            "No 'project' set. Add your project ID from the Biel.ai dashboard."
          )
        }

        updateConfig({
          head: [
            ...(config.head ?? []),
            {
              tag: 'link',
              attrs: {
                rel: 'stylesheet',
                href: `https://cdn.jsdelivr.net/npm/biel-search@${version}/dist/biel-search/biel-search.css`,
              },
            },
            {
              tag: 'script',
              attrs: {
                type: 'module',
                src: `https://cdn.jsdelivr.net/npm/biel-search@${version}/dist/biel-search/biel-search.esm.js`,
              },
            },
            {
              tag: 'script',
              content: generateBielScript(options),
            },
          ],
        })
      },
    },
  }
}
