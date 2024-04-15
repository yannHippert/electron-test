import React, { useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { PdfViewDialog } from './pdf-preview';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Props = {
  open: boolean;
  onClose: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function ImportGameDialog({ open, onClose }: Props) {
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | undefined>(undefined);

  //   let fileUrl = '';
  //   if (file) {
  //     fileUrl = window.URL.createObjectURL(file);
  //   }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const selectedFile = e.target.files[0];
    if (selectedFile === undefined) return;
    window.Main.parsePdf({ filePath: selectedFile.path }).then(({ data, error }) => {
      if (error) {
        return;
      }
      console.log(data);
    });
    // window.Main.when.parsePdf(({ data }) => {
    //   console.log(data);
    // });
    setFile(selectedFile);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import a game</DialogTitle>
          {/* <DialogDescription>Previewing: {file?.name}</DialogDescription> */}
        </DialogHeader>
        <div className="grid grid-cols-3 gap-2">
          <Label htmlFor="username" className="text-left col-span-full">
            File
          </Label>
          <Input onChange={onFileChange} type="file" multiple={false} className="col-span-2" />
          <Button
            onClick={() => {
              if (file) {
                setIsPreviewOpen(true);
              } else {
                toast.error('Please select a file');
              }
            }}
          >
            Preview
          </Button>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username" className="text-left col-span-full">
            Promp
          </Label>
          <Tabs defaultValue="ALWAYS">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ALWAYS">Always</TabsTrigger>
              <TabsTrigger value="ON_NOT_FOUND">On not found</TabsTrigger>
              <TabsTrigger value="NEVER">Never</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Button>Import</Button>
      </DialogContent>
      <PdfViewDialog open={isPreviewOpen} file={file} onClose={() => setIsPreviewOpen(false)} />
    </Dialog>
  );
}
