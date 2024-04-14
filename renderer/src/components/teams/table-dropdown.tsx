import { Pencil, Trash, Users } from 'lucide-react';

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

type Props = {
  teamId: number;
};

export function TeamTableDropdown({ teamId }: Props) {
  const deleteTeam = () => {
    // if (window.Main) {
    //   window.Main.deleteTeam({ teamId });
    //   window.Main.when.deleteTeam((data) => {
    //     teams.invalidate();
    //   });
    // }
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
