export default function DashboardPlaceholder({ sectionName }) {
  return (
    <section className="border border-dashed border-navy/30 rounded-sm p-8 md:p-12 bg-cream-soft/20 text-center">
      <p className="font-cardo text-navy text-lg md:text-xl">
        <span className="font-bold">{sectionName}</span> will be implemented from Figma.
      </p>
      <p className="font-cardo text-navy/70 text-base mt-2">
        Your account is signed in; no additional data is stored yet.
      </p>
    </section>
  )
}
