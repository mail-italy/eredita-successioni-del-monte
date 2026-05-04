"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ContactActions } from "@/components/contact-actions";
import { contacts, navigationGroups, primaryNav, siteConfig } from "@/lib/content";

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={active ? "nav-link nav-link-active" : "nav-link"}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  return (
    <header className="header">
      <div className="shell header-inner">
        <Link href="/" className="brand-mark">
          <strong>{siteConfig.brand}</strong>
          <span>{siteConfig.studio}</span>
        </Link>

        <nav className="desktop-nav" aria-label="Navigazione principale">
          <div className="desktop-nav-row">
            <NavLink href="/" label="Homepage" />
            <div className="nav-group">
              <button type="button" className="nav-group-trigger">
                Servizi
              </button>
              <div className="nav-dropdown">
                {navigationGroups[0].items.map((item) => (
                  <NavLink key={item.href} href={item.href} label={item.label} />
                ))}
                <NavLink href="/servizi" label="Tutti i servizi" />
              </div>
            </div>
            <div className="nav-group">
              <button type="button" className="nav-group-trigger">
                Aree
              </button>
              <div className="nav-dropdown">
                {navigationGroups[1].items.map((item) => (
                  <NavLink key={item.href} href={item.href} label={item.label} />
                ))}
                <NavLink href="/hub" label="Tutte le aree" />
              </div>
            </div>
            <div className="nav-group">
              <button type="button" className="nav-group-trigger">
                Approfondimenti
              </button>
              <div className="nav-dropdown">
                {navigationGroups[2].items.map((item) => (
                  <NavLink key={item.href} href={item.href} label={item.label} />
                ))}
                <NavLink href="/approfondimenti" label="Tutti gli approfondimenti" />
              </div>
            </div>
            <NavLink href="/chi-siamo" label="Chi siamo" />
            <NavLink href="/contatti" label="Contatti" />
          </div>
        </nav>

        <div className="header-actions">
          <ContactActions scope="header" includeEmail={false} compact />
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMobileOpen((value) => !value)}
          >
            Menu
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="mobile-drawer" id="mobile-drawer">
          <div className="shell mobile-drawer-inner">
            <nav className="mobile-nav" aria-label="Navigazione mobile">
              {primaryNav.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  onClick={() => setMobileOpen(false)}
                />
              ))}

              {navigationGroups.map((group) => (
                <div key={group.label} className="mobile-accordion">
                  <button
                    type="button"
                    className="mobile-accordion-trigger"
                    onClick={() =>
                      setExpandedGroup((value) => (value === group.label ? null : group.label))
                    }
                  >
                    {group.label}
                  </button>
                  {expandedGroup === group.label ? (
                    <div className="mobile-accordion-panel">
                      {group.items.map((item) => (
                        <NavLink
                          key={item.href}
                          href={item.href}
                          label={item.label}
                          onClick={() => setMobileOpen(false)}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>

            <div className="mobile-drawer-contact">
              <p className="muted">{contacts.address}</p>
              <ContactActions scope="mobile_menu" compact />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div className="brand-mark">
            <strong>{siteConfig.brand}</strong>
            <span>{siteConfig.studio}</span>
          </div>

          <nav className="nav" aria-label="Footer">
            <Link href="/privacy">Privacy</Link>
            <Link href="/faq-tematiche">FAQ</Link>
            <Link href="/glossario-successorio">Glossario</Link>
            <Link href="/approfondimenti">Approfondimenti</Link>
          </nav>
        </div>

        <div className="divider" />

        <div className="two-column">
          <div className="stack">
            <strong>Contatti</strong>
            <span className="muted">{contacts.address}</span>
            <span className="muted">{contacts.officeHours}</span>
            <ContactActions scope="footer" compact />
          </div>

          <p className="muted">
            Assistenza legale in materia di successioni, testamenti, divisioni
            ereditarie, legittima, donazioni, mediazione e successioni
            internazionali. Ricevimento su appuntamento.
          </p>
        </div>
      </div>
    </footer>
  );
}
