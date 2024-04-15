import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '../ui/button';

type Props = {
  open: boolean;
  file?: File;
  onClose: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function PdfViewDialog({ file, open, onClose }: Props) {
  const [numPages, setNumPages] = useState<number>();
  const [scale, setScale] = useState<number>(1.2);

  let fileUrl = '';
  if (file) {
    fileUrl = window.URL.createObjectURL(file);
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  pdfjs.GlobalWorkerOptions.workerSrc = `app:///pdf.worker.js`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="h-5/6 max-w-full w-max">
        <DialogHeader>
          <DialogTitle>Pdf preview</DialogTitle>
          <DialogDescription>Previewing: {file?.name}</DialogDescription>
        </DialogHeader>
        <Document file={{ url: fileUrl }} onLoadSuccess={onDocumentLoadSuccess} className="overflow-y-scroll">
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={scale} />
          ))}
        </Document>
        <div className="absolute flex left-1/2 -translate-x-1/2 bottom-2 gap-2 z-10">
          <Button onClick={() => setScale(scale + 0.1)}>
            <ZoomIn size={24} />
          </Button>
          <Button onClick={() => setScale(scale - 0.1)}>
            <ZoomOut size={24} />
          </Button>
        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
