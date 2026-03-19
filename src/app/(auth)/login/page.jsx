'use client'

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react"

export default function LoginPage() {


  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm border-none shadow-none bg-transparent">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-2xl font-bold">
           জামিয়া হোসাইনিয়া আরাবিয়া পূর্বাচল মাদরাসার ওয়েবসাইটে আপনাকে স্বাগতম
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Button 
            variant="outline" 
            className="w-full h-14 text-lg font-medium shadow-sm bg-white hover:bg-slate-50 transition-all border-slate-200"
            onClick={() => signIn('google')}
          >
            <FcGoogle className="mr-3 h-6 w-6" />
            Google দিয়ে লগইন করুন
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}