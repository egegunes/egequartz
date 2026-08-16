import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "ege's devlog",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "fathom",
      siteId: "HGORAWFR",
    },
    locale: "en-US",
    baseUrl: "ege.dev",
    ignorePatterns: ["private", "templates"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: {
          name: "DM Serif Display",
          weights: [400],
        },
        body: "Bricolage Grotesque",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#fdf5ea",
          lightgray: "#f0ddc0",
          gray: "#a9825a",
          darkgray: "#4a3018",
          dark: "#2b1608",
          secondary: "#c9660a",
          tertiary: "#a8480f",
          highlight: "#c9660a1a",
          textHighlight: "#f4b86688",
        },
        darkMode: {
          light: "#241206",
          lightgray: "#35200e",
          gray: "#8f6b48",
          darkgray: "#e8d2b0",
          dark: "#fbead2",
          secondary: "#ff9d4d",
          tertiary: "#ffb347",
          highlight: "#ff9d4d1a",
          textHighlight: "#ffcf8a55",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.Poetry(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown({
        enableInHtmlEmbed: false,
        parseTags: false,
        mermaid: false,
      }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "relative", lazyLoad: true }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
        rssFullHtml: true,
        rssFilter: (data) => data.relativePath?.startsWith("posts/") && data.slug! !== "posts/index" && data.frontmatter?.rss !== false,
        rssLinkParams: "utm_source=rss&utm_medium=rss&utm_campaign=rss",
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
