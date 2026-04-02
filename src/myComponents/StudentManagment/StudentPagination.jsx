"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, usePathname } from "next/navigation";

export function StudentPagination({ totalPages }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    // বর্তমান ফিল্টারগুলো ঠিক রেখে নতুন পেজ ইউআরএল তৈরি করার ফাংশন
    const createPageURL = (pageNumber) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    if (totalPages <= 1) return null; // ১ পেজ থাকলে প্যাজিনেশন দেখানোর দরকার নেই

    return (
        <Pagination className="my-6">
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        href={currentPage <= 1 ? "#" : createPageURL(currentPage - 1)}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;

                    // শুধুমাত্র বর্তমান পেজের আশেপাশের পেজগুলো দেখানোর লজিক (অপশনাল)
                    if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href={createPageURL(page)}
                                    isActive={currentPage === page}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    }

                    // এলিপসিস (...) দেখানোর লজিক
                    if (page === currentPage - 2 || page === currentPage + 2) {
                        return (
                            <PaginationItem key={page}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return null;
                })}

                {/* Next Button */}
                <PaginationItem>
                    <PaginationNext
                        href={currentPage >= totalPages ? "#" : createPageURL(currentPage + 1)}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}