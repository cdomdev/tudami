export function SectionContainer({
  children,
  className = "",
  id = "section-container",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`${className} mt-20 mx-auto`} >
      {children}
    </section>
  );
}
