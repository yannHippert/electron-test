import React, { useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { trpc } from '@/utils/trpc';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';

type Props = {
  teamId: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function EditTeamSheet({ teamId, children }: Props) {
  const { data: team } = trpc.teams.get.useQuery({ teamId: Number(teamId) });

  if (!team) {
    toast('Error', {
      description: 'No team found'
    });
    return null;
  }

  const [name, setName] = React.useState(team.name);
  const [shortName, setShortName] = React.useState(team.shortName);
  const [logo, setLogo] = React.useState<string | undefined>(team.logo ?? undefined);
  const [filePath, setFilePath] = React.useState<string | undefined>(undefined);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update the team</SheetTitle>
          <SheetDescription>Update the selected team</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Full-name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="short-name" className="text-right">
              Short-name
            </Label>
            <Input
              id="short-name"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="logo" className="text-right">
              Logo
            </Label>
            <Avatar>
              <AvatarImage src={logo} alt="Team logo" />
              <AvatarFallback className="font-bold">{team.shortName}</AvatarFallback>
            </Avatar>
            <Input
              id="logo"
              type="file"
              onChange={(e) => {
                if (e.target.files === null) return;
                const file = e.target.files[0];
                if (file === undefined) return;
                setFilePath(file.path);
                setLogo(window.URL.createObjectURL(file));
              }}
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild onClick={console.log}>
            <Button>Update team</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
