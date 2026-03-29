"use client";

import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Camera, Image as LuImage, X as LuX, Camera as LuCamera } from "lucide-react";
import Image from "next/image";
import baseUrl from "@/lib/axios";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "@/lib/imageHoster";
import { getPublicIdFromUrl } from "@/lib/getPublicIdFromUrl";


export default function EditSectionDialog({ studentId, title, fields, initialData, isImage = false }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialData);
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const cameraRef = useRef(null);
    const galleryRef = useRef(null);
    const router = useRouter();

    // ইমেজ প্রিভিউ এবং ফাইল সিলেক্ট হ্যান্ডলার
   const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
        setSelectedFile(file);
        
        // Use this instead of FileReader for better performance
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        // Clean up memory when component unmounts or preview changes
        return () => URL.revokeObjectURL(objectUrl);
    }
};

   const handleUpdate = async () => {
    setLoading(true);
    try {
        let finalUpdateData = { ...formData };
        const oldImageUrl = initialData?.image; // আগের ইমেজের ইউআরএল

        if (isImage && selectedFile) {
            // ১. নতুন ইমেজ আপলোড
            const newImageUrl = await uploadToCloudinary(selectedFile);
            finalUpdateData.image = newImageUrl;

            // ২. যদি নতুন ইমেজ সফলভাবে আপলোড হয়, তবেই পুরনোটি ডিলিট হবে
            if (oldImageUrl && oldImageUrl.includes("cloudinary")) {
                const publicId = getPublicIdFromUrl(oldImageUrl);
                
                // আপনার তৈরি করা API রুটে কল করুন
                await fetch("/api/cloudinary/delete", {
                    method: "POST",
                    body: JSON.stringify({ publicId }),
                });
            }
        }

        // ৩. ডাটাবেজে আপডেট পাঠানো
        await baseUrl.patch(`/students/update/${studentId}`, finalUpdateData);
        
        alert("তথ্য এবং ছবি সফলভাবে আপডেট হয়েছে!");
        setOpen(false);
        router.refresh();
    } catch (error) {
        console.error("Update failed:", error);
        alert("আপডেট করতে সমস্যা হয়েছে।");
    } finally {
        setLoading(false);
    }
};

    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val);
            if (!val) { setPreview(null); setSelectedFile(null); } // ডায়ালগ বন্ধ করলে স্টেট রিসেট
        }}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-slate-100">
                    {isImage ? <Camera className="h-4 w-4 text-slate-500" /> : <Pencil className="h-3.5 w-3.5 text-slate-400" />}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-100">
                <DialogHeader>
                    <DialogTitle className="text-center">{title} আপডেট</DialogTitle>
                    <DialogDescription className="sr-only">
                        আপনার তথ্য আপডেট করার জন্য নিচের ফরমটি ব্যবহার করুন।
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {isImage ? (
                        <div className="space-y-4">
                            <Label className="text-center block">ছবি পরিবর্তন করুন</Label>

                            <div className="flex gap-3 items-center border border-slate-200 p-2 rounded-xl bg-slate-50">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 gap-2 text-xs bg-white"
                                    onClick={() => cameraRef.current?.click()}
                                >
                                    <LuCamera className="h-4 w-4" /> ছবি তুলুন
                                </Button>

                                <span className="text-[10px] text-slate-400 font-bold uppercase">Or</span>

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 gap-2 text-xs bg-white"
                                    onClick={() => galleryRef.current?.click()}
                                >
                                    <LuImage className="h-4 w-4" /> গ্যালারি
                                </Button>
                            </div>

                            {/* Hidden Inputs */}
                            <input type="file" accept="image/*" capture="environment" ref={cameraRef} className="hidden" onChange={handleImagePreview} />
                            <input type="file" accept="image/*" ref={galleryRef} className="hidden" onChange={handleImagePreview} />

                            {/* Preview */}
                            {preview && (
                                <div className="relative w-32 h-32 mx-auto mt-2">
                                    <Button
                                        type='button'
                                        variant='destructive'
                                        size='icon'
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full z-10 shadow-md"
                                        onClick={() => { setPreview(null); setSelectedFile(null); }}
                                    >
                                        <LuX className="h-3 w-3" />
                                    </Button>
                                    <div className="w-full h-full overflow-hidden rounded-2xl border-4 border-white shadow-lg">
                                        <Image src={preview} alt="preview" fill className="object-cover" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        fields.map((field) => (
                            <div key={field.name} className="space-y-2">
                                <Label htmlFor={field.name} className="text-sm font-semibold">{field.label}</Label>
                                <Input
                                    id={field.name}
                                    className="rounded-xl focus-visible:ring-primary"
                                    value={formData[field.name] || ""}
                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                />
                            </div>
                        ))
                    )}
                </div>

                <DialogFooter className="sm:justify-start">
                    <Button
                        onClick={handleUpdate}
                        disabled={loading || (isImage && !selectedFile)}
                        className="w-full rounded-xl py-6 font-bold text-md"
                    >
                        {loading ? "আপলোড ও আপডেট হচ্ছে..." : "পরিবর্তন নিশ্চিত করুন"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}