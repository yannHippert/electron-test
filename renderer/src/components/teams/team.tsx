import { PencilRuler, PlusCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { EditTeamSheet } from '@/components/teams/edit-team-sheet';
import { TeamLogo } from '@/components/teams/team-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { trpc } from '@/utils/trpc';
import { CreateGameSheet } from '../games/create-game-sheet';

export function TeamPage() {
  const { teamId } = useParams();
  const { data: team } = trpc.teams.get.useQuery({ teamId: Number(teamId) });

  if (!teamId) {
    toast('Error', {
      description: 'No teamId provided'
    });
    return <h1>Error</h1>;
  }

  if (!team) {
    return <h1>Loading...</h1>;
  }

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <TeamLogo logo={team.logo} className="w-12 h-12" />
          <CardTitle>
            {team.name} ({team.shortName})
          </CardTitle>
          {/* <CardDescription>Recent games</CardDescription> */}
        </div>
        <div className="flex items-center gap-2">
          <EditTeamSheet teamId={teamId}>
            <Button asChild size="sm" className="ml-auto gap-1 hover:cursor-pointer">
              <div>
                <PencilRuler className="h-4 w-4" />
                Edit team
              </div>
            </Button>
          </EditTeamSheet>
          <CreateGameSheet homeTeamId={teamId}>
            <Button asChild size="sm" className="ml-auto gap-1 hover:cursor-pointer">
              <div>
                <PlusCircle className="h-4 w-4" />
                Add a game
              </div>
            </Button>
          </CreateGameSheet>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Home-team</TableHead>
              <TableHead className="w-24">Score</TableHead>
              <TableHead>Away-team</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {games.map((game) => ( */}
            <TableRow>
              <TableCell className="border-r">12-12-2024 20:15</TableCell>
              <TableCell className="border-r gap-x-2 flex items-center justify-end">
                <span>HBE</span>
                <img src="https://via.placeholder.com/50" alt="Team logo" className="w-8 h-8" />
              </TableCell>
              <TableCell className="border-r text-center">27 - 26</TableCell>
              <TableCell className="gap-x-2 flex items-center">
                <img src="https://via.placeholder.com/50" alt="Team logo" className="w-8 h-8" />
                <span>HBD</span>
              </TableCell>
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
