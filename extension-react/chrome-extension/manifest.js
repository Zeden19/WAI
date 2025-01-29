import fs from 'node:fs';
import deepmerge from 'deepmerge';

const packageJson = JSON.parse(fs.readFileSync('../package.json', 'utf8'));

const isFirefox = process.env.__FIREFOX__ === 'true';

/**
 * If you want to disable the sidePanel, you can delete withSidePanel function and remove the sidePanel HoC on the manifest declaration.
 *
 * ```js
 * const manifest = { // remove `withSidePanel()`
 * ```
 */
function withSidePanel(manifest) {
  // Firefox does not support sidePanel
  if (isFirefox) {
    return manifest;
  }
  return deepmerge(manifest, {
    side_panel: {
      default_path: 'side-panel/index.html',
    },
    permissions: ['sidePanel'],
  });
}

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = withSidePanel({
  name: 'signInWithPopup Demo',
  manifest_version: 3,
  default_locale: 'en',
  /**
   * if you want to support multiple languages, you can use the following reference
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
   */
  version: '0.1',
  description: '__MSG_extensionDescription__',
  host_permissions: ['<all_urls>'],

  permissions: ['offscreen', 'activeTab', 'storage', 'webNavigation', 'tabs'],
  offscreen_documents: [
    {
      url: 'offscreen.html',
      reasons: ['DOM_SCRAPING'],
      justification: 'authentication',
    },
  ],
  options_page: 'options/index.html',
  background: {
    type: 'module',
    service_worker: 'background.iife.js',
  },
  action: {
    default_popup: 'popup/index.html',
    default_icon: 'icon-34.png',
  },
  chrome_url_overrides: {
    newtab: 'new-tab/index.html',
  },
  icons: {
    128: 'icon-128.png',
  },
  content_scripts: [
    {
      run_at: 'document_end',
      js: ['content/index.iife.js'],
      matches: ['https://www.linkedin.com/*'],
    },
    {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['content-ui/index.iife.js'],
    },
    {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      css: ['content.css'], // public folder
    },
  ],
  devtools_page: 'devtools/index.html',

  content_security_policy: {
    extension_pages: "script-src 'self'; object-src 'self'",
    sandbox:
      "sandbox allow-scripts; script-src 'self' 'https://apis.google.com/' 'https://www.gstatic.com/' 'https://*.firebaseio.com' 'https://www.googleapis.com'; object-src 'self'",
  },

  web_accessible_resources: [
    {
      resources: ['*.js', '*.css', '*.svg', 'icon-128.png', 'icon-34.png'],
      matches: ['https://www.linkedin.com/*'],
    },
  ],
});

export default manifest;
