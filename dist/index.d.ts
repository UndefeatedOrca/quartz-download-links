import { QuartzTransformerPlugin } from '@quartz-community/types';
export { PageGenerator, PageMatcher, QuartzComponent, QuartzComponentConstructor, QuartzComponentProps, QuartzEmitterPlugin, QuartzFilterPlugin, QuartzPageTypePlugin, QuartzPageTypePluginInstance, QuartzTransformerPlugin, StringResource, VirtualPage } from '@quartz-community/types';
import { DirectDownloadOptions } from './types.js';

/**
 * Adds a download attribute to local Markdown links that point at downloadable assets.
 */
declare const DirectDownload: QuartzTransformerPlugin<Partial<DirectDownloadOptions>>;

export { DirectDownload, DirectDownloadOptions };
