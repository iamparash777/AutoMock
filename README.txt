CONTENT NEST 0.3 — BUILT-IN REGIONAL AVATARS

READY TO USE
48 built-in synthetic portrait avatars are included. No uploading, tagging,
network connection, API key or account is required for these avatars.

Each region includes 4 male and 4 female portraits:
  Asia            8 portraits
  Europe          8 portraits
  Africa          8 portraits
  North America   8 portraits
  South America   8 portraits
  Oceania         8 portraits

HOW TO USE
Open Images > Avatars. Pick a region and Mixed, Female, or Male.
Select a portrait, then apply it to your selected Figma shapes or frames.
With nothing selected, the plugin creates a new shape containing the portrait.
All regions shows all 48 built-ins. Shuffle changes the gallery order.
Your previously uploaded, tagged avatars also remain available.
Add my own photos (optional) reveals the upload controls when you need them.
Other covers non-populated/other territories used by the flag dataset; it has
no built-in portrait set. Use one of the six regional collections listed above.

The portraits are fictional AI-generated adults. Region and gender labels were
assigned when authoring the sample characters, rather than inferred from real
people. These are broad sample collections, not nationality or ethnicity data.
A single atlas is bundled into the plugin. Selected portraits are cropped and
prepared as PNGs locally in the interface; no image request is sent to a server.
Built-ins do not consume your 4 MB custom-library storage allowance.

UPGRADE
1. Export your current library backup from Text > Export backup.
2. Keep your existing manifest.json plugin id. That preserves the plugin's local
   storage namespace and identity.
3. Extract this release. Replace ui.html and code.js in your existing development
   plugin folder. To keep all source files up to date, copy the other files too;
   preserve your current manifest id if you replace manifest.json.
4. Close Content Nest and reopen it from Plugins > Development.
No build step is needed. The included ui.html already contains the portrait atlas.

FIRST INSTALL
In Figma desktop, create a new Figma Design development plugin with custom UI.
Copy its generated plugin id into this package's manifest.json, replacing the
content-nest-local placeholder. Import this package's manifest.json from
Plugins > Development > Import plugin from manifest, then run Content Nest.
Menu wording may vary slightly between Figma versions.

OTHER FEATURES
- 14 text locale presets, including countries across all six populated continents.
- Custom text collections from lines, CSV (value,gender) or JSON strings/objects.
  Optional line tags: female|Name and male|Name. Search and click an exact value,
  or use the bottom button to fill layers with random matching values.
- New text insertion: 1–100 layers; existing text bulk fill: up to 500 layers.
  Text in selected frames is included; hidden/locked layers are skipped.
- Built-in offline SVG brand logos, 249 country/territory flags and 39 common icons.
  More extensive icon search and general photos require internet access.
- Searchable emojis and skin-tone choices where supported.
- Maps use your own Mapbox public token. Street, satellite and dark static images
  are supported; traffic needs a compatible custom style. Provider usage charges
  and coverage may apply. Tokens stay in the session and are excluded from backups.
- US/UK phone samples use fictional ranges; other locales use X placeholders.
  Addresses are sample strings, not validated national postal address templates.
- Custom uploads: PNG/JPG/WebP, 1 MB each; total custom library: 4 MB.
  Browser preview storage and Figma storage are separate. Export/import to move
  your own collections between devices or environments.

SOURCE AND TESTS
The portrait atlas was created using the built-in imagegen tool.
Original project asset: avatar-atlas.png (1448 x 1086, exact 8 x 6 tile grid).
The complete generation prompt is in AVATAR-GENERATION-PROMPT.txt.
Portrait metadata is in assets.json, alongside bundled SVG assets.

After source changes, run node build.js to update ui.html.
Run node verify.cjs for 18 dependency-free checks.
Optional browser tests require Playwright and its Chromium browser:
  npm install --no-save playwright
  npx playwright install chromium
  node browser-check.cjs
The plugin itself has no runtime npm dependencies.

Validation: 18 content/asset/host checks, plus a sandboxed null-origin browser
with all external networking disabled. All 12 region/gender combinations were
checked for populated galleries, working previews and successful PNG insertion.
Existing logo, flag, text and custom-upload behavior was also checked.
Figma host API calls were mocked; this release has not been run in live Figma.

EXTERNAL ASSETS
See THIRD-PARTY-NOTICES.txt for the bundled Simple Icons, Lucide and flag-icons
license notices. Brand usage guidelines may apply. General online photos use
Lorem Picsum. No Content Reel code, branding or assets are included.
