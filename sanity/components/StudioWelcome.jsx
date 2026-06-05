export default function StudioWelcome() {
  return (
    <div
      style={{
        maxWidth: 640,
        margin: '2rem auto',
        padding: '1.5rem',
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        fontFamily: 'system-ui, sans-serif',
        lineHeight: 1.5,
      }}
    >
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 1rem' }}>
        Welcome, Sanji
      </h1>
      <p style={{ color: '#666', margin: '0 0 1.5rem' }}>
        This is where you update the website. Changes go live within about a minute after you
        click <strong>Publish</strong>.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div
          style={{
            padding: '1rem',
            background: '#e8f4fd',
            borderRadius: 6,
            borderLeft: '4px solid #2276fc',
          }}
        >
          <strong>① Add or edit a product</strong>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: '#555' }}>
            Open <strong>Products</strong> → <strong>Create</strong> → fill name, category, price,
            upload <strong>Main photo</strong> → turn on <strong>Show on website</strong> → Publish.
          </p>
        </div>

        <div style={{ padding: '1rem', background: '#f6f6f6', borderRadius: 6 }}>
          <strong>② Update gallery photos</strong>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: '#555' }}>
            Open <strong>Gallery photos</strong> → drag images to reorder → Publish.
          </p>
        </div>

        <div style={{ padding: '1rem', background: '#f6f6f6', borderRadius: 6 }}>
          <strong>③ Home page & sale banner (optional)</strong>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: '#555' }}>
            Use <strong>Home page</strong> for hero slides and reviews. Use{' '}
            <strong>Site settings</strong> for the top promo code and footer phone.
          </p>
        </div>
      </div>

      <p style={{ margin: '1.5rem 0 0', fontSize: '0.8125rem', color: '#888' }}>
        Tip: If something does not appear on the site, check that you clicked Publish and that Show
        on website is on for products.
      </p>
    </div>
  )
}
