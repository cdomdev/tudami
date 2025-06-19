export function SectionContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`${className} mt-20 mx-auto`}>
      {children}
    </section>
  );
}
