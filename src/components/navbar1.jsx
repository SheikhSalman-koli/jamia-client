"use client";

import { MapPin, Menu } from "lucide-react";
import {
  Accordion,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ModeToggle } from "@/myComponents/theme/ThemeToogle";
import { useUserRole } from "@/hooks/userRole";

const Navbar1 = ({ className }) => {

  const logo = {
    src: "https://res.cloudinary.com/dobtto17a/image/upload/v1773827388/madrasha-logo_nyskjk.jpg",
    alt: "logo",
    title: "পূর্বাচল মাদরাসা",
  }

  const auth = {
    login: { title: "লগইন", url: "login" },
  }

  const { role, session } = useUserRole()
  // console.log( session);

  let menu = []

  switch (role) {
    case 'super-admin':
      menu.push(
        {
          title: "হোম",
          url: "/"
        },
        {
          title: "ছাত্র ভর্তি",
          url: "/admitStudent",
        },
        {
          title: "ছাত্রদের তালিকা",
          url: "/see-students",
        },
        {
          title: "শিক্ষক নিয়োগ",
          url: "/add-teacher",
        },
        {
          title: "শিক্ষকদের তালিকা",
          url: "/teacher-list",
        },
        {
          title: "রোল পরিবর্তন",
          url: "/all-user",
        },
        {
          title: "পরিসংখ্যান",
          url: "/stats",
        }
      )
      break;

    case 'admin':
      menu.push(
        {
          title: "হোম",
          url: "/"
        },
        {
          title: "ছাত্র ভর্তি",
          url: "/admitStudent",
        },
        {
          title: "ছাত্রদের তালিকা",
          url: "/see-students",
        },
        {
          title: "শিক্ষকদের তালিকা",
          url: "/teacher-list",
        },
        {
          title: "পরিসংখ্যান",
          url: "/stats",
        }
      )
      break;

    case 'user':
      menu.push(
        {
          title: "হোম",
          url: "/"
        },
        {
          title: "ছাত্রদের তালিকা",
          url: "/see-students",
        },
        {
          title: "পরিসংখ্যান",
          url: "/stats",
        }
      )
      break

    default:
      menu.push(
        {
          title: "হোম",
          url: "/"
        }
      )
  }


  const googleMapsUrl = `https://maps.app.goo.gl/KJfGnUA5cnF7K8zp8`

  return (
    <section className={cn("py-4 border-b-2 border-b-green-500", className)}>
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex px-4">
          <div className="flex items-center gap-6">
            {/* Logo */}

            <Image
              src={logo?.src}
              className="max-h-8 dark:invert"
              width={35}
              height={40}
              alt={logo?.alt}
            />

            <Link
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              <MapPin className="h-4 w-4 text-red-500" />
              <span>লোকেশন ম্যাপ</span>
            </Link>

            <ModeToggle />

            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex gap-2">
            {/* <Button asChild variant="outline" size="sm">
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button> */}

            {session ?
              <div className="flex items-center gap-2">
                <Image
                  src={session?.user.image}
                  alt="user image"
                  width={30}
                  height={30}
                  className="rounded-full"
                />

                <Button
                  onClick={() => signOut()}
                >
                  লগআউট
                </Button>
              </div>

              :
              <Button asChild size="sm">
                <Link href={auth.login.url}>{auth.login.title}</Link>
              </Button>
            }

          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}

            <div className="flex gap-2">
              <Image
                src={logo?.src}
                className="max-h-8 dark:invert"
                width={35}
                height={40}
                alt={logo?.alt}
              />

              <Link
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden"
              >
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MapPin className="h-5 w-5 text-red-500" />
                </Button>
              </Link>

              <ModeToggle />
            </div>

            <Sheet>
              <div className="flex items-center gap-2">

                {
                  session?.user.image &&

                  <Image
                    src={session?.user.image}
                    alt="user image"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                }

                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
              </div>


              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>

                    <Image
                      src={logo?.src}
                      className="max-h-8 dark:invert"
                      width={35}
                      height={40}
                      alt={logo?.alt}
                    />

                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    {session ? <Button
                      onClick={() => signOut()}
                    >
                      লগআউট
                    </Button>
                      :
                      <Button asChild size="sm">
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                    }
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item) => {
  // if (item.items) {
  //   return (
  //     <NavigationMenuItem key={item.title}>
  //       <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
  //       <NavigationMenuContent className="bg-popover text-popover-foreground">
  //         {item.items.map((subItem) => (
  //           <NavigationMenuLink asChild key={subItem.title} className="w-80">
  //             <SubMenuLink item={subItem} />
  //           </NavigationMenuLink>
  //         ))}
  //       </NavigationMenuContent>
  //     </NavigationMenuItem>
  //   );
  // }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground">
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item) => {
  // if (item.items) {
  //   return (
  //     <AccordionItem key={item.title} value={item.title} className="border-b-0">
  //       <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
  //         {item.title}
  //       </AccordionTrigger>
  //       <AccordionContent className="mt-2">
  //         {item.items.map((subItem) => (
  //           <SubMenuLink key={subItem.title} item={subItem} />
  //         ))}
  //       </AccordionContent>
  //     </AccordionItem>
  //   );
  // }

  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

// const SubMenuLink = ({
//   item
// }) => {
//   return (
//     <a
//       className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
//       href={item.url}>
//       <div className="text-foreground">{item.icon}</div>
//       <div>
//         <div className="text-sm font-semibold">{item.title}</div>
//         {item.description && (
//           <p className="text-sm leading-snug text-muted-foreground">
//             {item.description}
//           </p>
//         )}
//       </div>
//     </a>
//   );
// };

export { Navbar1 };
