import { Routes } from '../../routes';
import { Package2 } from 'lucide-react';

const links = [
  {
    title: 'Dashboard',
    href: Routes.Dashboard
  },
  {
    title: 'Games',
    href: Routes.Games
  },
  {
    title: 'Teams',
    href: Routes.Teams
  },
  {
    title: 'Players',
    href: Routes.Players
  }
];

export function Navigation() {
  return (
    <nav className="font-medium flex flex-row items-center gap-5 text-sm">
      <a href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
        <Package2 className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </a>
      {links.map((link) => (
        <a key={link.href} href={link.href} className="text-foreground transition-colors hover:text-foreground">
          {link.title}
        </a>
      ))}
    </nav>
  );
}
