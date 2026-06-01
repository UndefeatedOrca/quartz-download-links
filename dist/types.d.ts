export { BuildCtx, CSSResource, ChangeEvent, JSResource, PageGenerator, PageMatcher, ProcessedContent, QuartzEmitterPlugin, QuartzEmitterPluginInstance, QuartzFilterPlugin, QuartzFilterPluginInstance, QuartzPageTypePlugin, QuartzPageTypePluginInstance, QuartzPluginData, QuartzTransformerPlugin, QuartzTransformerPluginInstance, StaticResources, VirtualPage } from '@quartz-community/types';

interface DirectDownloadOptions {
    /** File extensions that should keep normal link behavior. Values may include or omit a leading dot. */
    excludedExtensions: string[];
    /** Ignore unusually long suffixes so extensionless routes and dotted slugs are not changed accidentally. */
    maxExtensionLength: number;
}

export type { DirectDownloadOptions };
