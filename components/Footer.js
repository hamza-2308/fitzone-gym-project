import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-graphite border-t border-white/5">
      <div className="container-px py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="font-display text-2xl text-bone mb-3">
            FIT<span className="text-ember">ZONE</span>
          </div>
          <p className="text-haze text-sm leading-relaxed max-w-xs">
            A modern training ground for people who show up. Strength,
            conditioning and coaching under one roof.
          </p>
        </div>

        <div>
          <h4 className="text-bone font-semibold mb-4 text-sm">Explore</h4>
          <ul className="space-y-2.5 text-sm text-haze">
            <li><Link href="/about" className="hover:text-ember">About Us</Link></li>
            <li><Link href="/equipment" className="hover:text-ember">Equipment</Link></li>
            <li><Link href="/services" className="hover:text-ember">Services</Link></li>
            <li><Link href="/trainers" className="hover:text-ember">Trainers</Link></li>
            <li><Link href="/programs" className="hover:text-ember">Programs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-bone font-semibold mb-4 text-sm">Membership</h4>
          <ul className="space-y-2.5 text-sm text-haze">
            <li><Link href="/packages" className="hover:text-ember">Packages</Link></li>
            <li><Link href="/gallery" className="hover:text-ember">Gallery</Link></li>
            <li><Link href="/transformations" className="hover:text-ember">Transformations</Link></li>
            <li><Link href="/testimonials" className="hover:text-ember">Testimonials</Link></li>
            <li><Link href="/contact" className="hover:text-ember">Contact</Link></li>
            <li><Link href="/booking" className="hover:text-ember">Book a Session</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-bone font-semibold mb-4 text-sm">Contact</h4>
          <ul className="space-y-2.5 text-sm text-haze">
            <li>Blue Area, Islamabad</li>
            <li>+92 300 1234567</li>
            <li>hello@fitzone.pk</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-px py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-haze">
          <span>© 2026 FitZone. All rights reserved.</span>
          <Link href="/admin/login" className="hover:text-ember">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
