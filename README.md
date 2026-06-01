# Quartz Download Links

Quartz v5 transformer plugin that adds the HTML `download` attribute to local Markdown links for downloadable assets.

It skips external links, anchors, parent-relative links, Markdown files, PDFs, and common image formats by default. Links such as `[Archive](files/archive.zip)` render as direct downloads, while `[Note](note.md)`, `[PDF](paper.pdf)`, and `[Image](image.png)` keep normal Quartz behavior.

## Install

```bash
npx quartz plugin add github:patri/quartz-download-links
```

Register it in `quartz.config.yaml`:

```yaml
plugins:
  - source: github:patri/quartz-download-links
    enabled: true
```

For advanced `quartz.ts` usage:

```ts
import { DirectDownload } from "./.quartz/plugins";

export default {
  plugins: {
    transformers: [DirectDownload()],
  },
};
```

## Options

```yaml
plugins:
  - source: github:patri/quartz-download-links
    enabled: true
    options:
      excludedExtensions:
        - md
        - markdown
        - pdf
        - jpg
        - jpeg
        - png
        - gif
        - svg
        - webp
        - bmp
        - ico
        - avif
      maxExtensionLength: 5
```

| Option               | Type       | Default                                    | Description                                                                                            |
| -------------------- | ---------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `excludedExtensions` | `string[]` | Markdown, PDF, and common image extensions | Extensions that should not receive `download`. Leading dots are allowed but not required.              |
| `maxExtensionLength` | `number`   | `5`                                        | Ignores unusually long suffixes so extensionless routes and dotted slugs are not changed accidentally. |

## Development

```bash
npm test
npm run build
```

Commit `dist/` after building; Quartz uses the prebuilt output when loading the plugin.
