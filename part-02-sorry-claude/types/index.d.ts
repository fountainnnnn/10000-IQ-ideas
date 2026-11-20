export type Sorry = boolean

declare module 'claude-code' {
  interface PluginState {
    'formal-apology': { isSorry: Sorry }
  }
}
