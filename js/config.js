// ─────────────────────────────────────────────────────────────────
//  BharatVoice — Config
//  Edit this file to customise behaviour without touching main code
// ─────────────────────────────────────────────────────────────────

const CONFIG = {

  // App info
  appName: "BharatVoice",
  version: "1.0.0",

  // Typing delay range (ms) — makes the bot feel natural
  typingDelayMin: 600,
  typingDelayMax: 1100,

  // How many schemes to show per category before collapsing
  // (not implemented yet — planned for v1.1)
  maxSchemesPerCategory: 10,

  // Set to true when Claude API key is configured
  // When true, chat.js will use AI matching instead of rule-based
  useClaudeAPI: false,

  // Claude API settings (for v2 upgrade)
  // Get your key at: https://console.anthropic.com
  claude: {
    model: "claude-sonnet-4-6",
    maxTokens: 1000,
    // apiKey is intentionally NOT stored here — use env vars or a backend
  },

  // WhatsApp integration (v3 planned)
  whatsapp: {
    enabled: false,
    // phoneNumberId: "your_number_id",
    // accessToken: "your_token",
  },

  // DigiLocker (v4 planned)
  digilocker: {
    enabled: false,
    // clientId: "your_client_id",
  },

  // Show/hide debug info in console
  debug: false,

};
