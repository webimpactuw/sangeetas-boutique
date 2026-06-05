import StudioWelcome from './components/StudioWelcome.jsx'

/**
 * Studio sidebar — daily tasks first, help at the top.
 */
export const deskStructure = (S) =>
  S.list()
    .title("Sanji's Label")
    .items([
      S.listItem()
        .title('★ Start here — quick guide')
        .id('studio-welcome')
        .child(S.component().component(StudioWelcome).title('How to use Studio')),

      S.divider(),

      S.listItem()
        .title('① Products — add & edit shop items')
        .child(
          S.list()
            .title('Products')
            .items([
              S.listItem()
                .title('➕ New apparel item')
                .child(
                  S.document()
                    .schemaType('product')
                    .initialValueTemplate('product-apparel')
                    .title('New apparel item'),
                ),
              S.listItem()
                .title('➕ New jewelry / accessory')
                .child(
                  S.document()
                    .schemaType('product')
                    .initialValueTemplate('product-accessory')
                    .title('New jewelry / accessory'),
                ),
              S.divider(),
              S.documentTypeListItem('product')
                .title('All products')
                .child(
                  S.documentTypeList('product')
                    .title('All products')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                    .initialValueTemplates([
                      S.initialValueTemplateItem('product-apparel'),
                      S.initialValueTemplateItem('product-accessory'),
                    ]),
                ),
            ]),
        ),

      S.listItem()
        .title('② Gallery photos')
        .id('singleton-galleryPage')
        .child(
          S.document()
            .schemaType('galleryPage')
            .documentId('galleryPage')
            .title('Gallery photos'),
        ),

      S.divider(),

      S.listItem()
        .title('③ Home page (hero, categories, reviews)')
        .id('singleton-homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home page'),
        ),

      S.listItem()
        .title('④ Site settings (promo bar, footer, phone)')
        .id('singleton-siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site settings'),
        ),
    ])
