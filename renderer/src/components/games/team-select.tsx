import * as React from 'react';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { CreateTeamSheet } from '../teams/create-sheet';

type Props = {
  label: string;
  options: { value: string | number; label: string }[];
} & React.HTMLAttributes<HTMLDivElement>;

export function TeamSelect({ label, options, className }: Props) {
  const [value, setValue] = React.useState('');

  const onChange = (pValue: string) => {
    if (pValue !== 'create') setValue(pValue);
    console.log(pValue);
  };

  return (
    <div className={cn(className)}>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className={cn('w-full')}>
          <SelectValue placeholder={`Select a ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectLabel>Fruits</SelectLabel> */}
            {options.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <CreateTeamSheet>
              <SelectItem value="create">Create a {label}</SelectItem>
            </CreateTeamSheet>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
