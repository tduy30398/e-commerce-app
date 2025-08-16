import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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
  setPage,
}) => {
  const isMobile = useIsMobile();

  const visiblePages = React.useMemo(() => {
    const pages: (number | 'ellipsis')[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (current <= 3) {
      pages.push(1, 2, 3, 'ellipsis', totalPages);
      return pages;
    }

    if (current >= totalPages - 2) {
      pages.push(1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages);
      return pages;
    }

    pages.push(
      1,
      'ellipsis',
      current - 1,
      current,
      current + 1,
      'ellipsis',
      totalPages
    );
    return pages;
  }, [totalPages, current]);

  return (
    <Pagination className="mt-5">
      <PaginationContent className="w-full flex justify-between items-center gap-4">
        <PaginationItem
          aria-disabled={current === 1}
          className={current === 1 ? 'cursor-not-allowed' : ''}
        >
          <Button
            onClick={onPrev}
            disabled={current === 1}
            variant="outline"
            size="sm"
            className={current !== 1 ? 'cursor-pointer' : ''}
          >
            <ArrowLeft className="size-4 mr-1" />
            {isMobile ? '' : 'Prev'}
          </Button>
        </PaginationItem>
        <div className="flex gap-2 items-center justify-center">
          {visiblePages.map((p, idx) =>
            p === 'ellipsis' ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <Button
                  disabled={p === current}
                  size="sm"
                  variant={p === current ? 'default' : 'outline'}
                  onClick={() => setPage(p)}
                  className={cn(
                    'min-w-[36px] px-2',
                    p === current ? 'font-semibold' : 'cursor-pointer'
                  )}
                >
                  {p < 10 ? `0${p}` : p}
                </Button>
              </PaginationItem>
            )
          )}
        </div>
        <PaginationItem
          aria-disabled={current === totalPages}
          className={current === totalPages ? 'cursor-not-allowed' : ''}
        >
          <Button
            onClick={onNext}
            disabled={current === totalPages}
            variant="outline"
            size="sm"
            className={current !== totalPages ? 'cursor-pointer' : ''}
          >
            {isMobile ? '' : 'Next'}
            <ArrowRight className="size-4 ml-1" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationCustom;
