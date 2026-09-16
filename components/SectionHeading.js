export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} mb-14`}>
      {eyebrow && <p className="label-tag mb-3">{eyebrow}</p>}
      <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-bone">
        {title}
      </h2>
      {description && (
        <p className="text-haze mt-4 leading-relaxed">{description}</p>
      )}
    </div>
  );
}
