import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [ 
    Component.Comments({
      provider: 'giscus',
      options: {
        repo: 'weirenhao/quartz',
        repoId: 'R_kgDONV8DIw',
        category: 'Announcements',
        categoryId: 'DIC_kwDONV8DI84Ck1ae',
        mapping: "pathname",
        strict: false,
        reactionsEnabled: true,
        inputPosition: "top",
      }
    }),
  ],
  
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
      "Scroll to top ↑": "#",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer())
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "最近更新",
        showTags: false,
        limit: 4,
        filter: (f) => {
          if (f.filePath?.endsWith("index.md")) {
            return false
          }
          return true
        },
        sort: (f1, f2) => {
          if (f1.dates && f2.dates) {
            if (Math.abs(f2.dates.modified.getDay() - f1.dates.modified.getDay())<=3) {
              return f2.dates.created.getTime() - f1.dates.created.getTime()
            }
            return f2.dates.modified.getTime() - f1.dates.modified.getTime()
          } else if (f1.dates && !f2.dates) {
            return -1
          }
          return 1
        }
      })
    ),
  ]
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
