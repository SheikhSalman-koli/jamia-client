// "use client";

// import { useSearchParams, usePathname, useRouter } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Search, RotateCcw } from "lucide-react";

// export default function StudentFilters() {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const { replace } = useRouter();

//   // ইউআরএল আপডেট করার হ্যান্ডলার
//   const handleFilter = useDebouncedCallback((key, value) => {
//     const params = new URLSearchParams(searchParams);
    
//     // যদি ভ্যালু "all" হয় বা খালি থাকে, তবে প্যারামিটার ডিলিট করে দেব
//     if (value && value !== "all") {
//       params.set(key, value);
//     } else {
//       params.delete(key);
//     }
    
//     replace(`${pathname}?${params.toString()}`, { scroll: false });
//   }, 400);

//   const resetFilters = () => {
//     replace(pathname, { scroll: false });
//   };

//   return (
//     <div className="bg-white p-4 rounded-xl border shadow-sm space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
        
//         {/* ১. সার্চ বার (searchTerm) */}
//         <div className="relative md:col-span-2 lg:col-span-1">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//           <Input
//             placeholder="নাম বা ফোন..."
//             className="pl-9 bg-slate-50/50"
//             defaultValue={searchParams.get("searchTerm") || ""}
//             onChange={(e) => handleFilter("searchTerm", e.target.value)}
//           />
//         </div>

//         {/* ২. বিভাগ (department) */}
//         <Select 
//           defaultValue={searchParams.get("department") || "all"} 
//           onValueChange={(val) => handleFilter("department", val)}
//         >
//           <SelectTrigger className="bg-slate-50/50">
//             <SelectValue placeholder="সব বিভাগ" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">সব বিভাগ</SelectItem>
//             <SelectItem value="হিফজ বিভাগ">হিফজ বিভাগ</SelectItem>
//             <SelectItem value="কিতাব বিভাগ">কিতাব বিভাগ</SelectItem>
//             <SelectItem value="মক্তব বিভাগ">মক্তব বিভাগ</SelectItem>
//           </SelectContent>
//         </Select>

//         {/* ৩. ক্লাস (class) */}
//         <Select 
//           defaultValue={searchParams.get("class") || "all"} 
//           onValueChange={(val) => handleFilter("class", val)}
//         >
//           <SelectTrigger className="bg-slate-50/50">
//             <SelectValue placeholder="সব ক্লাস" />
//           </SelectTrigger> 
//           <SelectContent>
//             <SelectItem value="all">সব ক্লাস</SelectItem>
//             <SelectItem value="শিশু শ্রেণী">শিশু শ্রেণী</SelectItem>
//             <SelectItem value="১ম শ্রেণী">১ম শ্রেণী</SelectItem>
//             <SelectItem value="২য় শ্রেণী">২য় শ্রেণী</SelectItem>
//             <SelectItem value="৩য় শ্রেণী">৩য় শ্রেণী</SelectItem>
//             <SelectItem value="হিফজ খানা">হিফজ বিভাগ</SelectItem>
//             <SelectItem value="৪র্থ শ্রেণী">৪র্থ শ্রেণী</SelectItem>
//             <SelectItem value="তাইসির">তাইসির</SelectItem>
//             <SelectItem value="মিযান">মিযান</SelectItem>
//             <SelectItem value="নাহবেমীর">নাহবেমীর</SelectItem>
//             <SelectItem value="হেদায়াতুন্নাহু">হেদায়াতুন্নাহু</SelectItem>
//             <SelectItem value="কাফিয়া">কাফিয়া</SelectItem>
//             <SelectItem value="শরহে বেকায়া">শরহে বেকায়া</SelectItem>
//           </SelectContent>
//         </Select>

//         {/* ৪. ব্লাড গ্রুপ (bloodGroup) */}
//         <Select 
//           defaultValue={searchParams.get("bloodGroup") || "all"} 
//           onValueChange={(val) => handleFilter("bloodGroup", val)}
//         >
//           <SelectTrigger className="bg-slate-50/50">
//             <SelectValue placeholder="রক্তের গ্রুপ" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">সব গ্রুপ</SelectItem>
//             <SelectItem value="A+">A+</SelectItem>
//             <SelectItem value="A-">A-</SelectItem>
//             <SelectItem value="B+">B+</SelectItem>
//             <SelectItem value="B-">B-</SelectItem>
//             <SelectItem value="AB+">AB+</SelectItem>
//             <SelectItem value="AB-">AB-</SelectItem>
//             <SelectItem value="O+">O+</SelectItem>
//             <SelectItem value="O-">O-</SelectItem>
//           </SelectContent>
//         </Select>


//         {/* ৬. ক্যাটাগরি (category) */}
//         <Select 
//           defaultValue={searchParams.get("category") || "all"} 
//           onValueChange={(val) => handleFilter("category", val)}
//         >
//           <SelectTrigger className="bg-slate-50/50">
//             <SelectValue placeholder="ক্যাটাগরি" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
//             <SelectItem value="আবাসিক">আবাসিক</SelectItem>
//             <SelectItem value="অনাবাসিক">অনাবাসিক</SelectItem>
//           </SelectContent>
//         </Select>

//         {/* রিসেট বাটন */}
//         <Button 
//           variant="ghost" 
//           size="icon" 
//           onClick={resetFilters}
//           className="text-slate-400 hover:text-red-500 hover:bg-red-50"
//           title="ফিল্টার রিসেট করুন"
//         >
//           <RotateCcw className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw, SlidersHorizontal, ChevronUp, Banknote } from "lucide-react";

export default function StudentFilters() {
  const [showFilters, setShowFilters] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilter = useDebouncedCallback((key, value) => {
    const params = new URLSearchParams(searchParams);
    // নতুন ফিল্টার সিলেক্ট করলে পেজ ১ এ পাঠিয়ে দেওয়া ভালো
  params.set("page", "1");
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 400);

  const resetFilters = () => {
    replace(pathname, { scroll: false });
  };

  return (
    <div className=" p-1 rounded-xl border shadow-sm space-y-3">
      {/* মেইন বার: সার্চ এবং ফিল্টার টগল বাটন */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="নাম, পিতার নাম"
            className="pl-9 bg-slate-50/50 h-10"
            defaultValue={searchParams.get("searchTerm") || ""}
            onChange={(e) => handleFilter("searchTerm", e.target.value)}
          />
        </div>

        <Button
          variant={showFilters ? "secondary" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
          className="h-10 gap-2 shrink-0"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">ফিল্টার</span>
          {showFilters ? <ChevronUp className="h-4 w-4" /> : null}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={resetFilters}
          className="h-10 w-10 text-slate-400 hover:text-red-500 shrink-0"
          title="রিসেট"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* কন্ডিশনাল ফিল্টার ড্রপডাউনস */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t animate-in fade-in slide-in-from-top-2 duration-300">
          
          {/* বিভাগ */}
          <div className="min-w-30 flex-1">
            <Select 
              defaultValue={searchParams.get("department") || "all"} 
              onValueChange={(val) => handleFilter("department", val)}
            >
              <SelectTrigger className="h-9 bg-slate-50/50 text-xs">
                <SelectValue placeholder="বিভাগ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">বিভাগ</SelectItem>
                <SelectItem value="হিফজ বিভাগ">হিফজ বিভাগ</SelectItem>
                <SelectItem value="কিতাব বিভাগ">কিতাব বিভাগ</SelectItem>
                <SelectItem value="মক্তব বিভাগ">মক্তব বিভাগ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ক্লাস */}
          <div className="min-w-30 flex-1">
            <Select 
              defaultValue={searchParams.get("class") || "all"} 
              onValueChange={(val) => handleFilter("class", val)}
            >
              <SelectTrigger className="h-9 bg-slate-50/50 text-xs">
                <SelectValue placeholder="ক্লাস" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ক্লাস</SelectItem>
                {["শিশু শ্রেণী", "১ম শ্রেণী", "২য় শ্রেণী", "৩য় শ্রেণী", "নাজেরা", "হিফজ খানা", "৪র্থ শ্রেণী", "তাইসির", "মিযান", "নাহবেমীর", "হেদায়াতুন্নাহু", "কাফিয়া", "শরহে বেকায়া"].map(cls => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ব্লাড গ্রুপ */}
          <div className="min-w-30 flex-1">
            <Select 
              defaultValue={searchParams.get("bloodGroup") || "all"} 
              onValueChange={(val) => handleFilter("bloodGroup", val)}
            >
              <SelectTrigger className="h-9 bg-slate-50/50 text-xs">
                <SelectValue placeholder="রক্ত" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">রক্তের গ্রুপ</SelectItem>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                  <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ক্যাটাগরি */}
          <div className="min-w-30 flex-1">
            <Select 
              defaultValue={searchParams.get("category") || "all"} 
              onValueChange={(val) => handleFilter("category", val)}
            >
              <SelectTrigger className="h-9 bg-slate-50/50 text-xs">
                <SelectValue placeholder="ক্যাটাগরি" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ক্যাটাগরি</SelectItem>
                <SelectItem value="আবাসিক">আবাসিক</SelectItem>
                <SelectItem value="অনাবাসিক">অনাবাসিক</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ফ্রি */}
          <div className="min-w-30 flex-1">
            <Select 
              defaultValue={searchParams.get("feeType") || "all"} 
              onValueChange={(val) => handleFilter("feeType", val)}
            >
              <SelectTrigger className="h-9 bg-slate-50/50 text-xs border-blue-100">
                <div className="flex items-center gap-1">
                  <SelectValue placeholder="ফি এর ধরন" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">খোরাকীর পরিমান</SelectItem>
                <SelectItem value="free">ফ্রি</SelectItem>
                <SelectItem value="underOneThou">১০০০ অথবা কম</SelectItem>
                <SelectItem value="underTwoThou">২০০০ অথবা কম</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
      )}
    </div>
  );
}