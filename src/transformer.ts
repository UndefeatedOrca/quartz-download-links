import type { Link, Root } from "mdast";
import type { Plugin, PluggableList } from "unified";
import { visit } from "unist-util-visit";
import type { QuartzTransformerPlugin } from "@quartz-community/types";
import type { DirectDownloadOptions } from "./types";

type LinkWithHProperties = Link & {
  data?: Link["data"] & {
    hProperties?: Record<string, unknown>;
  };
};

const defaultOptions: DirectDownloadOptions = {
  excludedExtensions: [
    "md",
    "markdown",
    "pdf",
    "jpg",
    "jpeg",
    "png",
    "gif",
    "svg",
    "webp",
    "bmp",
    "ico",
    "avif",
  ],
  maxExtensionLength: 5,
};

const normalizeExtensions = (extensions: string[]) =>
  new Set(extensions.map((extension) => extension.replace(/^\./, "").toLowerCase()));

const hasProtocol = (url: string) => /^[a-z][a-z\d+.-]*:/i.test(url);

const isLocalDownloadCandidate = (url: string) => {
  if (
    url.length === 0 ||
    url.startsWith("#") ||
    url.startsWith("?") ||
    url.startsWith("//") ||
    url.startsWith("..") ||
    hasProtocol(url)
  ) {
    return false;
  }

  return true;
};

const getExtension = (url: string) => {
  const path = url.split(/[?#]/, 1)[0] ?? "";
  const filename = path.split("/").pop() ?? "";
  const dotIndex = filename.lastIndexOf(".");

  if (dotIndex <= 0 || dotIndex === filename.length - 1) {
    return undefined;
  }

  return filename.slice(dotIndex + 1).toLowerCase();
};

const setDownloadAttribute = (node: Link) => {
  const link = node as LinkWithHProperties;
  node.data = node.data ?? {};
  link.data = link.data ?? {};
  link.data.hProperties = {
    ...link.data.hProperties,
    download: "",
  };
};

const remarkDirectDownload = (options: DirectDownloadOptions): Plugin<[], Root> => {
  const excludedExtensions = normalizeExtensions(options.excludedExtensions);

  return () => (tree: Root) => {
    visit(tree, "link", (node: Link) => {
      if (!isLocalDownloadCandidate(node.url)) {
        return;
      }

      const extension = getExtension(node.url);
      if (
        extension === undefined ||
        extension.length > options.maxExtensionLength ||
        excludedExtensions.has(extension)
      ) {
        return;
      }

      setDownloadAttribute(node);
    });
  };
};

/**
 * Adds a download attribute to local Markdown links that point at downloadable assets.
 */
export const DirectDownload: QuartzTransformerPlugin<Partial<DirectDownloadOptions>> = (
  userOptions?: Partial<DirectDownloadOptions>,
) => {
  const options = { ...defaultOptions, ...userOptions };
  return {
    name: "DirectDownload",
    markdownPlugins(): PluggableList {
      return [remarkDirectDownload(options)];
    },
  };
};
