"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdmissionChart({ dailyData }) {
    console.log(dailyData);
  // মাউন্টিং চেকের জন্য সহজ ও সঠিক উপায়
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // requestAnimationFrame ব্যবহার করলে ব্রাউজার পেইন্টিং এর পর এটি রান হবে, 
    // ফলে সিনক্রোনাস রেন্ডারিং এরর আসবে না।
    const timer = requestAnimationFrame(() => {
      setHasMounted(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  // ডাটা মেমোরাইজ করা (পারফরম্যান্সের জন্য ভালো)
  const chartData = useMemo(() => dailyData || [], [dailyData]);

  if (!hasMounted) {
    return (
      <Card className="lg:col-span-4 shadow-sm border-none bg-white">
        <CardContent className="h-[350px] flex items-center justify-center">
          <div className="text-slate-400 animate-pulse">গ্রাফ লোড হচ্ছে...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-4 shadow-sm border-none bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800">
          ভর্তির গ্রাফ (তারিখ অনুযায়ী)
        </CardTitle>
      </CardHeader>
      
      <CardContent className="h-[350px] w-full pl-0 pr-4 pt-4">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(str) => {
                  const date = new Date(str);
                  return date.toLocaleDateString('bn-BD', { day: 'numeric', month: 'short' });
                }}
              />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#2563eb"
                fillOpacity={1}
                fill="url(#colorCount)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400 text-sm">
            পর্যাপ্ত ডাটা নেই
          </div>
        )}
      </CardContent>
    </Card>
  );
}