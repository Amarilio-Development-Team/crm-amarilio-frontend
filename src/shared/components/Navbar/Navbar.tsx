import { getSession } from '@/shared/lib/auth';
import NavbarLogoutButton from './NavbarLogoutButton';
import ThemeToggle from '@/shared/components/ThemeToggle';
import Link from 'next/link';
import GlobalSearchBar from '@/features/global-search/components/GlobalSearchBar';
import MobileMenuButton from './MobileMenuButton';

export default async function Navbar() {
  const session = await getSession();

  const displayName = session?.user?.name || 'Usuario Desconocido';
  const displayInitial = displayName ? displayName.charAt(0).toUpperCase() : '?';

  return (
    <header className="navbar sticky top-0 z-[99999] flex w-full flex-col-reverse justify-between gap-4 px-0 md:h-[80px] md:flex-row">
      <GlobalSearchBar />

      <div className="center flex w-full justify-between gap-4 md:justify-end">
        <MobileMenuButton />

        <article className="flex items-center gap-4">
          <ThemeToggle />

          <div className="flex items-center gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="bg-main hover:container-color-hover group avatar btn btn-circle grid size-12 place-items-center rounded-full border border-white/20 hover:opacity-90"
              >
                <span className="text-lg font-medium leading-none group-hover:text-strong">{displayInitial}</span>
              </div>
              <ul tabIndex={0} className="menu dropdown-content menu-sm z-[99999] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
                <li>
                  <Link href="/mi-perfil" className="justify-between">
                    Perfil
                  </Link>
                </li>
                <li>
                  <NavbarLogoutButton />
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </header>
  );
}
