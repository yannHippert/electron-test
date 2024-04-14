import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { CreateTeamSheet } from './create-sheet';
import { TeamTableDropdown } from './table-dropdown';
import { TeamLogo } from './team-logo';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

export function TeamsPage() {
  const navigate = useNavigate();

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Teams</CardTitle>
          <CardDescription>Current teams</CardDescription>
        </div>
        <CreateTeamSheet>
          <Button asChild size="sm" className="ml-auto gap-1 hover:cursor-pointer">
            <div>
              <PlusCircle className="h-4 w-4" />
              Add a team
            </div>
          </Button>
        </CreateTeamSheet>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Short-name</TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {teamsState.teams.map((team) => (
              <TableRow key={team.id} onClick={() => navigate(`/teams/${team.id}`)} className="cursor-pointer">
                <TableCell>
                  <TeamLogo logo={team.logo} className="w-12 h-12" />
                </TableCell>
                <TableCell>{team.shortName}</TableCell>
                <TableCell>{team.name}</TableCell>
                <TableCell className="flex flex-row justify-end" onClick={(e) => e.stopPropagation()}>
                  <TeamTableDropdown teamId={team.id} />
                </TableCell>
              </TableRow>
            ))} */}
            <TableRow onClick={() => navigate(`/teams/1`)} className="cursor-pointer">
              <TableCell>
                <TeamLogo logo="" className="w-12 h-12" />
              </TableCell>
              <TableCell>HBE</TableCell>
              <TableCell>Handball Esch</TableCell>
              <TableCell className="flex flex-row justify-end" onClick={(e) => e.stopPropagation()}>
                <TeamTableDropdown teamId={1} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
