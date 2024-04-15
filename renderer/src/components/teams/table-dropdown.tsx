import { CheckCircle, Pencil, Trash, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { trpc } from '@/utils/trpc';
import { toast } from 'sonner';

type Props = {
  teamId: number;
};

export function TeamTableDropdown({ teamId }: Props) {
  const utils = trpc.useContext();
  const deleteMutation = trpc.teams.delete.useMutation({
    async onSuccess(data) {
      toast(`Team ${data.name} deleted`, { duration: 2000, icon: <CheckCircle /> });
      await utils.teams.getAll.invalidate();
    }
  });

  const deleteTeam = () => {
    deleteMutation.mutate({ id: teamId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={`/teams/${teamId}`}>
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              <span>View</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={deleteTeam}>
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
            {/* Add delete confirmation */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
