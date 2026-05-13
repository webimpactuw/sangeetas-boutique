/**
 * One-click navigation for editors: open the real documents directly
 * (ids match `npm run sanity:seed`).
 */
export const deskStructure = (S) =>
  S.list()
    .title('Website')
    .items([
      S.listItem()
        .title('Site settings')
        .id('singleton-siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site settings'),
        ),
      S.listItem()
        .title('Home page')
        .id('singleton-homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home page'),
        ),
    ])
