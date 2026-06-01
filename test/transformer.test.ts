import { describe, expect, it } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import type { Link, Root } from "mdast";
import { visit } from "unist-util-visit";
import { DirectDownload } from "../src/transformer";
import { createCtx } from "./helpers";

type LinkWithHProperties = Link & {
  data?: Link["data"] & {
    hProperties?: Record<string, unknown>;
  };
};

describe("DirectDownload", () => {
  it("adds download attributes to local non-markdown asset links", async () => {
    const ctx = createCtx();
    const transformer = DirectDownload();
    const plugins = transformer.markdownPlugins?.(ctx) ?? [];

    const tree = unified()
      .use(remarkParse)
      .use(plugins)
      .parse("[Archive](files/archive.zip)") as Root;

    await unified().use(plugins).run(tree);

    expect(firstLink(tree)?.data?.hProperties).toEqual({ download: "" });
  });

  it("leaves markdown, pdf, image, external, and parent links unchanged", async () => {
    const ctx = createCtx();
    const transformer = DirectDownload();
    const plugins = transformer.markdownPlugins?.(ctx) ?? [];

    const tree = unified()
      .use(remarkParse)
      .use(plugins)
      .parse(
        [
          "[Note](note.md)",
          "[Pdf](paper.pdf)",
          "[Image](image.png)",
          "[External](https://example.com/file.zip)",
          "[Parent](../file.zip)",
        ].join("\n"),
      ) as Root;

    await unified().use(plugins).run(tree);

    const links = collectLinks(tree);
    expect(links).toHaveLength(5);
    for (const link of links) {
      expect(link.data?.hProperties).toBeUndefined();
    }
  });

  it("supports custom excluded extensions", async () => {
    const ctx = createCtx();
    const transformer = DirectDownload({ excludedExtensions: ["zip"] });
    const plugins = transformer.markdownPlugins?.(ctx) ?? [];

    const tree = unified()
      .use(remarkParse)
      .use(plugins)
      .parse("[Archive](files/archive.zip)") as Root;

    await unified().use(plugins).run(tree);

    expect(firstLink(tree)?.data?.hProperties).toBeUndefined();
  });
});

const collectLinks = (tree: Root): LinkWithHProperties[] => {
  const links: LinkWithHProperties[] = [];
  visit(tree, "link", (node: Link) => {
    links.push(node as LinkWithHProperties);
  });
  return links;
};

const firstLink = (tree: Root) => collectLinks(tree)[0];
