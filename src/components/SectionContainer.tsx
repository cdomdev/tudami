export function SectionContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={`mt-16 max-w-6xl mx-auto`}>
      {children}
    </section>
  );
}
