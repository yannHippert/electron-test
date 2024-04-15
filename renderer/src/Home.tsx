import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Navigation } from './components/common/navigation';
import { Routes } from './routes';
import { TeamsPage } from './components/teams/teams';
import { Toaster } from './components/ui/sonner';
import { TeamPage } from './components/teams/team';
import { GamesPage } from './components/games/games';

const router = createBrowserRouter([
  {
    path: Routes.Home,
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to={Routes.Teams}>Teams</Link>
      </div>
    )
  },
  {
    path: Routes.Teams,
    element: <TeamsPage />
  },
  {
    path: Routes.Team,
    element: <TeamPage />
  },
  {
    path: Routes.Games,
    element: <GamesPage />
  }
]);

function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Navigation />
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 relative">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <RouterProvider router={router} />
        </div>
      </main>
      <Toaster />
    </div>
  );
}

export default Home;
