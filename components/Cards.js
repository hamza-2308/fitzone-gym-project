import Link from "next/link";
import Image from "next/image";

export function EquipmentCard({ item }) {
  return (
    <Link href={`/equipment/${item.id}`} className="card overflow-hidden block group">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-6">
        <span className="text-ember text-xs font-semibold uppercase">
          {item.category.replace("-", " ")}
        </span>
        <h3 className="font-display text-xl text-bone mt-2">{item.name}</h3>
        <p className="text-haze text-sm mt-2 line-clamp-2">{item.description}</p>
      </div>
    </Link>
  );
}

export function ServiceCard({ item }) {
  return (
    <div className="card overflow-hidden">
      <div className="relative h-48">
        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl text-bone">{item.name}</h3>
        <p className="text-haze text-sm mt-2 leading-relaxed">{item.description}</p>
        <div className="flex items-center justify-between mt-5">
          <span className="text-bone font-semibold">
            {item.price ? `Rs ${item.price.toLocaleString()}` : "Custom"}
            <span className="text-haze font-normal text-xs"> / {item.duration}</span>
          </span>
          <Link href={`/booking?service=${item.id}`} className="text-ember text-sm font-semibold">
            Book Now →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function TrainerCard({ item }) {
  return (
    <div className="card overflow-hidden text-center">
      <div className="relative h-64">
        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl text-bone">{item.name}</h3>
        <p className="text-ember text-sm font-semibold mt-1">{item.specialization}</p>
        <p className="text-haze text-xs mt-2">{item.experience} experience</p>
        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
          {item.certifications.map((c) => (
            <span key={c} className="text-[11px] border border-white/10 rounded-full px-2.5 py-1 text-haze">
              {c}
            </span>
          ))}
        </div>
        <Link
          href={`/booking?trainer=${item.id}`}
          className="btn-outline mt-5 w-full text-sm py-2.5"
        >
          Book with {item.name.split(" ")[0]}
        </Link>
      </div>
    </div>
  );
}

export function PackageCard({ item, featured = false }) {
  return (
    <div className={`card p-8 flex flex-col ${featured ? "border-ember/60 relative" : ""}`}>
      {featured && (
        <span className="absolute -top-3 left-8 bg-ember text-ink text-xs font-bold px-3 py-1 rounded-sm">
          Most Popular
        </span>
      )}
      <h3 className="font-display text-2xl text-bone">{item.name}</h3>
      <div className="mt-4 mb-6">
        <span className="font-display text-4xl text-bone">Rs {item.price.toLocaleString()}</span>
        <span className="text-haze text-sm"> / {item.duration}</span>
      </div>
      <ul className="space-y-3 mb-8 flex-1">
        {item.benefits.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm text-bone/90">
            <span className="text-ember mt-0.5">✓</span> {b}
          </li>
        ))}
      </ul>
      <Link
        href={`/booking?package=${item.id}`}
        className={featured ? "btn-primary w-full" : "btn-outline w-full"}
      >
        Choose {item.name}
      </Link>
    </div>
  );
}
