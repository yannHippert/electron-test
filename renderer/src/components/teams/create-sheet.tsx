import { CheckCircle } from 'lucide-react';
import React from 'react';
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

export function CreateTeamSheet({ children }: { children: React.ReactNode }) {
  const [name, setName] = React.useState('');
  const [shortName, setShortName] = React.useState('');

  const createTeam = () => {
    // if (window.Main) {
    //   window.Main.createTeam({ name, shortName });
    //   window.Main.when.createTeam(({ data: team, error }) => {
    //     if (error) {
    //       toast(String(error), { duration: 2000 });
    //       return;
    //     }
    //     teamState.invalidate();
    //     toast(`Team ${team.name} created`, { duration: 1000, icon: <CheckCircle /> });
    //   });
    // } else {
    //   toast('Electron error', {
    //     description: 'You are in a Browser, so no Electron functions are available'
    //   });
    // }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a team</SheetTitle>
          <SheetDescription>Create a new team</SheetDescription>
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
        </div>
        <SheetFooter>
          <SheetClose asChild onClick={createTeam}>
            <Button>Create team</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
