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
import { useTeam } from '@/hooks/useTeam';

type Props = {
  teamId: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function EditTeamSheet({ teamId, children }: Props) {
  const { team } = useTeam({ teamId });
  const [name, setName] = React.useState('');
  const [shortName, setShortName] = React.useState('');
  const [logo, setLogo] = React.useState<string | null>(null);
  const [filePath, setFilePath] = React.useState<string | undefined>(undefined);

  useEffect(() => {
    if (team) {
      setName(team.name);
      setShortName(team.shortName);
      setLogo(team.logo);
    }
  }, [team]);

  const updateTeam = () => {
    if (window.Main && team) {
      window.Main.updateTeam({ teamId: team.id, name, shortName, logo: filePath });
      // window.Main.on('updateTeam', () => {
      //   toast('Team created', {
      //     description: JSON.stringify(team, null, 2)
      //   });
      // });
    } else {
      toast('Electron error', {
        description: 'You are in a Browser, so no Electron functions are available'
      });
    }
  };

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
            <img src={`app:///${logo}`} alt="Team logo" />
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
          <SheetClose asChild onClick={updateTeam}>
            <Button>Update team</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
