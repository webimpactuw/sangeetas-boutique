/**
 * Studio sidebar — plain labels so Sanji knows where to click.
 */
export const deskStructure = (S) =>
  S.list()
    .title("Sanji's Label")
    .items([
      S.listItem()
        .title('① Site settings (banner, footer, phone)')
        .id('singleton-siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site settings'),
        ),
      S.listItem()
        .title('② Home page (hero, categories, reviews)')
        .id('singleton-homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home page'),
        ),
      S.divider(),
      S.listItem()
        .title('③ Products — add & edit items')
        .child(
          S.documentTypeList('product')
            .title('Products')
            .defaultOrdering([{ field: 'name', direction: 'asc' }]),
        ),
      S.listItem()
        .title('④ Gallery photos')
        .id('singleton-galleryPage')
        .child(
          S.document()
            .schemaType('galleryPage')
            .documentId('galleryPage')
            .title('Gallery page'),
        ),
    ])
