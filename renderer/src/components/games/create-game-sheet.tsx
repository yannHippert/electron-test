import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { ImportIcon } from 'lucide-react';
import { DatePicker } from '../ui/date-picker';
import { ImportGameDialog } from './import-game';
import { TeamSelect } from './team-select';
import { trpc } from '@/utils/trpc';

type Props = {
  homeTeamId?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function CreateGameSheet({ homeTeamId, children }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { data: teams } = trpc.teams.getAll.useQuery();

  const teamOptions = teams ? teams.map((team) => ({ value: team.id, label: team.name })) : [];

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a game</SheetTitle>
          <SheetDescription>Create a new game</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Date
            </Label>
            <DatePicker />
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Time
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div> */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Home-team
            </Label>
            <TeamSelect label="team" defaultValue={homeTeamId} options={teamOptions} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Away-team
            </Label>
            <TeamSelect label="team" options={teamOptions} className="col-span-3" />
          </div>
          <div>
            <Button onClick={() => setIsDialogOpen(true)}>
              <ImportIcon size={16} className="mr-2" />
              Import from file
            </Button>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Create game</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
      <ImportGameDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </Sheet>
  );
}
