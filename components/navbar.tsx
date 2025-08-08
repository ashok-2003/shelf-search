"use client"
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Heart, Bell } from "lucide-react";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationDrawer } from "@/components/notification-drawer";

// Mock data to check for unread notifications - replace with your actual data source
const hasUnreadNotifications = true; // This should come from your state management

export const Navbar = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const logoPath = "logo/ShelfSearch.svg";

  const handleMarkAllAsRead = () => {
    // Handle marking all notifications as read
    console.log("Marking all notifications as read");
    // Update your state management here
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="flex-shrink-0 text-base pointer-events-none text-default-400" />
      }
      type="search"
    />
  );

  return (
    <>
      <HeroUINavbar maxWidth="2xl" position="sticky" isBordered isBlurred>
        {/* Left section - Logo */}
        <NavbarContent className="basis-1/3" justify="start">
          <NavbarBrand as="li" className="gap-2 max-w-fit">
            <NextLink className="flex items-center justify-start gap-1" href="/">
              <Image
                src={logoPath}
                alt="shelfSearch logo"
                width={100}
                height={100}
              />
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        {/* Center section - Navigation Items */}
        <NavbarContent className="hidden lg:flex basis-1/3" justify="center">
          <ul className="flex gap-6 font-semibold">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        {/* Right section - Actions */}
        <NavbarContent className="hidden sm:flex basis-1/3" justify="end">
          <NavbarItem className="items-center hidden gap-2 sm:flex">
            {/* Heart/Favorites Link */}
            <NextLink href="/favorites">
              <Button
                isIconOnly
                variant="light"
                aria-label="Go to Favorites"
                className="transition-colors hover:bg-default-100"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </NextLink>

            {/* Notifications Bell with Dot Indicator */}
            <Button
              isIconOnly
              variant="light"
              aria-label="Open notifications"
              className={clsx(
                "relative hover:bg-default-100 transition-all duration-200",
                hasUnreadNotifications && "animate-pulse"
              )}
              onPress={() => setIsNotificationOpen(true)}
            >
              <Bell className="w-5 h-5" />
              {hasUnreadNotifications && (
                <>
                  {/* Red dot indicator */}
                  <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 border border-white"></span>
                  {/* Subtle red glow/vibration effect */}
                  <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 animate-ping opacity-75"></span>
                </>
              )}
            </Button>

            {/* User Avatar */}
            <Avatar className="ml-2 rounded-full">
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
          </NavbarItem>
        </NavbarContent>

        {/* Mobile content */}
        <NavbarContent className="pl-4 sm:hidden basis-1" justify="end">
          {/* Mobile Notifications */}
          <Button
            isIconOnly
            variant="light"
            aria-label="Open notifications"
            className={clsx(
              "relative hover:bg-default-100 transition-all duration-200 sm:hidden",
              hasUnreadNotifications && "animate-pulse"
            )}
            onPress={() => setIsNotificationOpen(true)}
          >
            <Bell className="w-5 h-5" />
            {hasUnreadNotifications && (
              <>
                <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 border border-white"></span>
                <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 animate-ping opacity-75"></span>
              </>
            )}
          </Button>
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          <div className="flex flex-col">
            {/* Optional top content */}
            <div className="flex-1" />

            {/* Navigation items positioned towards bottom */}
            <div className="flex flex-col gap-6 pt-8 pb-12 mx-4">
              {siteConfig.navMenuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`} className="font-extrabold text-left align-bottom">
                  <Link
                    color="primary"
                    href={item.href}
                    size="lg"
                    className="w-full"
                  >
                    <span className="text-3xl">
                      {item.label}
                    </span>
                  </Link>
                </NavbarMenuItem>
              ))}
            </div>
          </div>
        </NavbarMenu>
      </HeroUINavbar>

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    </>
  );
};