import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

interface PaginationCustomProps {
  totalPages: number
  current: number
  onNext: () => void
  onPrev: () => void
  setPage: (page: number) => void
}

const PaginationCustom: React.FC<PaginationCustomProps> = ({
  totalPages,
  current,
  onNext,
  onPrev,
  setPage
}) => {
  return (
    <Pagination className="mt-5">
      <PaginationContent className="w-full flex justify-between items-center gap-4">
        <PaginationItem
          aria-disabled={current === 1}
          className={current === 1 ? "cursor-not-allowed" : ""}
        >
          <Button
            onClick={onPrev}
            disabled={current === 1}
            variant="outline"
            size="sm"
            className={current !== 1 ? "cursor-pointer" : ""}
          >
            <ArrowLeft className="size-4 mr-1" />
            Prev
          </Button>
        </PaginationItem>
        <div className="flex gap-2 items-center justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              disabled={p === current}
              size="sm"
              variant={p === current ? "default" : "outline"}
              onClick={() => setPage(p)}
              className={`min-w-[36px] px-2 ${p === current ? 'font-semibold' : 'cursor-pointer'}`}
            >
              {p < 10 ? `0${p}` : p}
            </Button>
          ))}
        </div>
        <PaginationItem
          aria-disabled={current === totalPages}
          className={current === totalPages ? "cursor-not-allowed" : ""}
        >
          <Button
            onClick={onNext}
            disabled={current === totalPages}
            variant="outline"
            size="sm"
            className={current !== totalPages ? "cursor-pointer" : ""}
          >
            Next
            <ArrowRight className="size-4 ml-1" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationCustom
