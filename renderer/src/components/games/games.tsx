import { PlusCircle } from 'lucide-react';
import { CreateGameSheet } from '@/components/games/create-game-sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function GamesPage() {
  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Games</CardTitle>
          <CardDescription>Recent games</CardDescription>
        </div>
        <CreateGameSheet>
          <Button asChild size="sm" className="ml-auto gap-1 hover:cursor-pointer">
            <div>
              <PlusCircle className="h-4 w-4" />
              Add a game
            </div>
          </Button>
        </CreateGameSheet>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden xl:table-column">Date</TableHead>
              <TableHead className="hidden xl:table-column">Status</TableHead>
              <TableHead className="hidden xl:table-column">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">Liam Johnson</div>
                <div className="hidden text-sm text-muted-foreground md:inline">liam@example.com</div>
              </TableCell>
              <TableCell className="hidden xl:table-column">Sale</TableCell>
              <TableCell className="hidden xl:table-column">
                <Badge className="text-xs" variant="outline">
                  Approved
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell lg:hidden xl:table-column">2023-06-23</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
