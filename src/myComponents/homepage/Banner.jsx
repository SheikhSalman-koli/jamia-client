import { Button } from "@/components/ui/button";
import { UserPlus, Calendar, ArrowRight, School, GraduationCap, MapPin } from "lucide-react";
import Link from "next/link";

export default function AdmissionBanner() {
  return (
    <div className="relative w-full bg-slate-50 border-b overflow-hidden">
      {/* Background Pattern - Light Mesh or Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      
      {/* Decorative Circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Status Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-200 text-blue-700 text-sm font-semibold shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            নতুন সেশনে ভর্তি চলছে ২০২৬
          </div>

          {/* Admission Heading */}
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              আপনার সন্তানের <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                উজ্জ্বল ভবিষ্যৎ গড়ি
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              আধুনিক কারিকুলাম, দ্বীনি পরিবেশ এবং দক্ষ শিক্ষক মন্ডলীর মাধ্যমে পরিচালিত আমাদের মাদরাসায় মক্তব, হিফজ ও কিতাব বিভাগে সীমিত আসনে ভর্তি চলছে।
            </p>
          </div>

          {/* Action Buttons */}
          {/* <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-xl shadow-blue-200 gap-2 transition-all hover:scale-105 active:scale-95">
              <UserPlus className="h-5 w-5" /> অনলাইনে ভর্তি হোন
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full bg-white gap-2 transition-all hover:bg-slate-50">
              <Calendar className="h-5 w-5" /> পরীক্ষার সময়সূচী <ArrowRight className="h-4 w-4" />
            </Button>
          </div> */}

          {/* Dynamic Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-12 w-full max-w-5xl">
            <FeatureItem 
              icon={<School className="h-6 w-6" />} 
              label="আবাসিক ও অনাবাসিক" 
              sub="সুবিধা সম্পন্ন"
              bgColor="bg-blue-50"
              textColor="text-blue-600"
            />
            <FeatureItem 
              icon={<GraduationCap className="h-6 w-6" />} 
              label="হিফজ ও কিতাব" 
              sub="অভিজ্ঞ ওস্তাদ"
              bgColor="bg-indigo-50"
              textColor="text-indigo-600"
            />
            <FeatureItem 
              icon={<MapPin className="h-6 w-6" />} 
              label="মনোরম পরিবেশ" 
              sub="যাতায়াত সুবিধা"
              bgColor="bg-slate-100"
              textColor="text-slate-700"
            />
            <FeatureItem 
              icon={<Calendar className="h-6 w-6" />} 
              label="ভর্তি শুরু" 
              sub="২৮ মার্চ ২০২৬ থেকে"
              bgColor="bg-red-50"
              textColor="text-red-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, label, sub, bgColor, textColor }) {
  return (
    <div className="flex flex-col items-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-100 shadow-sm transition-all hover:shadow-md">
      <div className={`p-3 ${bgColor} ${textColor} rounded-xl mb-3`}>
        {icon}
      </div>
      <span className="text-sm md:text-base font-bold text-slate-800">{label}</span>
      <span className="text-[10px] md:text-xs uppercase tracking-wider text-slate-400 font-bold mt-1">{sub}</span>
    </div>
  );
}