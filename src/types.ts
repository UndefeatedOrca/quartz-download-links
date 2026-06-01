export type {
  BuildCtx,
  ChangeEvent,
  CSSResource,
  JSResource,
  ProcessedContent,
  QuartzEmitterPlugin,
  QuartzEmitterPluginInstance,
  QuartzFilterPlugin,
  QuartzFilterPluginInstance,
  QuartzPluginData,
  QuartzTransformerPlugin,
  QuartzTransformerPluginInstance,
  StaticResources,
  PageMatcher,
  PageGenerator,
  VirtualPage,
  QuartzPageTypePlugin,
  QuartzPageTypePluginInstance,
} from "@quartz-community/types";

export interface DirectDownloadOptions {
  /** File extensions that should keep normal link behavior. Values may include or omit a leading dot. */
  excludedExtensions: string[];
  /** Ignore unusually long suffixes so extensionless routes and dotted slugs are not changed accidentally. */
  maxExtensionLength: number;
}
