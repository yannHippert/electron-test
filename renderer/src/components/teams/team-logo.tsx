import { Users } from 'lucide-react';
import React, { HtmlHTMLAttributes } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Props = {
  logo: string | undefined;
} & HtmlHTMLAttributes<HTMLDivElement>;

export function TeamLogo({ logo, className }: Props) {
  return (
    <Avatar className={cn('flex justify-center items-center rounded-sm', className)}>
      {logo && <AvatarImage src={`app:///${logo}`} alt="Team logo" className="object-contain" />}
      <AvatarFallback>
        <Users />
      </AvatarFallback>
    </Avatar>
  );
}
