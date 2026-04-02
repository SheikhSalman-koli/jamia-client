"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus, UserCheck, CalendarDays, GraduationCap, School, Banknote, AlertTriangle } from "lucide-react";
import AdmissionChart from "./DailyTrand";

export default function StudentAnalytics({ stats }) {
    // console.log(stats);
  // ডাটা ডেস্ট্রাকচারিং
  const summary = stats?.summary || {};
  const dailyData = stats?.dailyTrend || [];
  const deptData = stats?.byDepartment || [];
  const classData = stats?.byClass || [];

  return (
    <div className="p-4 md:p-8 space-y-8 bg-slate-50/50 min-h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">প্রাতিষ্ঠানিক পরিসংখ্যান</h1>
        <p className="text-slate-500">মাদরাসার বর্তমান অবস্থা এবং ভর্তির ট্রেন্ড একনজরে দেখুন।</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="মোট শিক্ষার্থী" 
          value={summary.totalStudents} 
          icon={<Users className="h-5 w-5 text-blue-600" />}
          description="সর্বমোট রেজিস্টার্ড"
        />
          <StatCard 
          title="নতুন শিক্ষার্থী" 
          value={summary.totalNewStudents} 
          icon={<UserPlus className="h-5 w-5 text-green-600" />}
          description="চলতি শিক্ষাবর্ষ"
        />
        <StatCard 
          title="পুরাতন শিক্ষার্থী" 
          value={summary.totalOldStudents} 
          icon={<UserCheck className="h-5 w-5 text-indigo-600" />}
          description="বিগত শিক্ষাবর্ষ"
        />
         <StatCard 
          title="মোট খরচ" 
          value={`${summary.totalCost} ৳`} 
          icon={<Banknote className="h-5 w-5 text-indigo-600" />}
          description={`${summary.totalStudents} * ${summary.totalCost / summary.totalStudents} টাকা (প্রতি শিক্ষার্থী)`}
        />
         <StatCard 
          title="ধার্যকৃত খোরাকীর টাকা" 
          value={summary.totalKhurakiAmount} 
          icon={<Banknote className="h-5 w-5 text-indigo-600" />}
          description="ধার্যকৃত সর্বমোট পরিমাণ"
        />
         <StatCard 
          title="ঘাটতি আছে" 
          value={summary.totalCost - summary.totalKhurakiAmount} 
          icon={<AlertTriangle className="h-5 w-5 text-red-600" />}
          description="যাকাত থেকে খরচ হবে"
        />
        <StatCard 
          title="আজকের সর্বমোট ভর্তি" 
          value={summary.todayAdmitted} 
          icon={<CalendarDays className="h-5 w-5 text-orange-600" />}
          description="গত ২৪ ঘণ্টায়"
        />
        <StatCard 
          title="আজকে নতুন ভর্তি" 
          value={summary.todayNewAdmitted} 
          icon={<UserPlus className="h-5 w-5 text-orange-600" />}
          description="গত ২৪ ঘণ্টায়"
        />
        <StatCard 
          title="আজকে পুরাতন ভর্তি" 
          value={summary.todayOldAdmitted} 
          icon={<UserCheck className="h-5 w-5 text-orange-600" />}
          description="গত ২৪ ঘণ্টায়"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        

        {/* Detailed Tabs (Dept & Class) */}
        <Card className="lg:col-span-3 shadow-sm border-none">
          <Tabs defaultValue="dept" className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <TabsList className="bg-slate-100">
                <TabsTrigger value="dept">বিভাগ</TabsTrigger>
                <TabsTrigger value="class">জামাত/ক্লাস</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="dept" className="space-y-4">
                {deptData.map((item) => (
                  <ProgressBar key={item._id} label={item._id} total={item.total} newCount={item.new} icon={<School className="h-4 w-4" />} />
                ))}
              </TabsContent>
              <TabsContent value="class" className="space-y-4">
                {classData.map((item) => (
                  <ProgressBar key={item._id} label={item._id} total={item.total} newCount={item.new} icon={<GraduationCap className="h-4 w-4" />} />
                ))}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        {/* Admission Trend Chart */}
        <AdmissionChart 
        dailyData={dailyData}
        />
      </div>
    </div>
  );
}

// Reusable Stat Card Component
function StatCard({ title, value, icon, description }) {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-slate-600">{title}</CardTitle>
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900">{value || 0}</div>
        <p className="text-xs text-slate-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

// Custom Progress Bar Component
function ProgressBar({ label, total, newCount, icon }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 font-medium text-slate-700">
          {icon} {label}
        </div>
        <span className="text-slate-500">{total} জন</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-500" 
          style={{ width: `${(total / 100) * 100}%` }} // এখানে লজিক অনুযায়ী পারসেন্টেজ দিতে পারেন
        />
      </div>
      <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
        <span>পুরাতন: {total - newCount}</span>
        <span>নতুন: {newCount}</span>
      </div>
    </div>
  );
}