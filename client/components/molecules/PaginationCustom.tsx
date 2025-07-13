import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"
import { Button } from '../ui/button';

interface PaginationCustomProps {
  totalPages: number;
  current: number;
  onNext: () => void;
  onPrev: () => void;
  setPage: (page: number) => void;
}


const PaginationCustom: React.FC<PaginationCustomProps> = ({
  totalPages,
  current,
  onNext,
  onPrev,
  setPage
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className='cursor-not-allowed'>
          <PaginationPrevious
            onClick={onPrev}
            className={current === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <PaginationItem key={p}>
            <Button
              variant={p === current ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(p)}
              className='cursor-pointer'
            >
              {p}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem className='cursor-not-allowed'>
          <PaginationNext
            onClick={onNext}
            className={current === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationCustom