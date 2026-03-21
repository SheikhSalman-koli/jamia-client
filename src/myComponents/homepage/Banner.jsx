import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, BookOpen, Settings } from "lucide-react";

export default function GeneralBanner() {
  return (
    <div className="relative w-full bg-white border-b overflow-hidden">
      {/* Background Pattern - Soft Grid or Dots */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Badge Style Info */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            সিস্টেম বর্তমানে সচল রয়েছে
          </div>

          {/* Main Heading */}
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
              স্মার্ট এবং আধুনিক <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                প্রাতিষ্ঠানিক ব্যবস্থাপনা
              </span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              শিক্ষার্থী ডাটাবেজ, ফলাফল ব্যবস্থাপনা এবং প্রশাসনিক সকল কার্যক্রমকে এক সুতোয় নিয়ে আসার ডিজিটাল প্ল্যাটফর্ম। নির্ভুল এবং দ্রুত কাজের নিশ্চয়তা।
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-12 px-8 shadow-lg shadow-blue-200 gap-2">
              <LayoutDashboard className="h-5 w-5" /> ড্যাশবোর্ড দেখুন
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 gap-2">
              <Settings className="h-5 w-5" /> সেটিংস
            </Button>
          </div>

          {/* Stats / Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 pt-12 border-t w-full max-w-4xl">
            <div className="flex flex-col items-center space-y-1">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 mb-2">
                <Users className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-slate-800">৫০০+</span>
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">শিক্ষার্থী</span>
            </div>
            
            <div className="flex flex-col items-center space-y-1">
              <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 mb-2">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-slate-800">১৫+</span>
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">বিভাগ</span>
            </div>

            <div className="flex flex-col items-center space-y-1">
              <div className="p-3 bg-slate-50 rounded-2xl text-slate-600 mb-2">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-slate-800">১০০%</span>
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">ডিজিটাল</span>
            </div>

            <div className="flex flex-col items-center space-y-1">
              <div className="p-3 bg-green-50 rounded-2xl text-green-600 mb-2">
                <Settings className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-slate-800">২৪/৭</span>
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">সাপোর্ট</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}