import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="footer">
      <p>Designed &amp; built by {profile.name}</p>
      <p className="footer-sub">
        Built with Next.js and React Three Fiber.
      </p>
    </footer>
  );
}
