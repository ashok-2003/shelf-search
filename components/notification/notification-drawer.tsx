"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { Button } from "@heroui/button";
import { Bell, X } from "lucide-react";
import clsx from "clsx";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDisclosure } from "@heroui/modal";

// Mock notifications data - replace with your actual data
const mockNotifications = [
  {
    id: 1,
    title: "New book added to your shelf",
    message: "The Great Gatsby has been added to your reading list",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    title: "Reading reminder",
    message: "Don't forget to continue reading 1984",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "Book recommendation",
    message: "Based on your reading history, you might like Dune",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    title: "Reading goal update",
    message: "You're 2 books away from your monthly goal!",
    time: "1 day ago",
    read: true,
  },
  {
    id: 5,
    title: "New review posted",
    message: "Someone reviewed a book you recommended",
    time: "2 days ago",
    read: true,
  },
  {
    id: 6,
    title: "Weekly reading summary",
    message: "You've read 3 books this week! Keep up the great work.",
    time: "3 days ago",
    read: true,
  },
  {
    id: 7,
    title: "Book club invitation",
    message: "You've been invited to join the Science Fiction book club",
    time: "1 week ago",
    read: true,
  },
];

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onMarkAllAsRead: () => void;
}

export const NotificationDrawer = ({
  isOpen,
  onClose,
  onMarkAllAsRead
}: NotificationDrawerProps) => {
  const handleMarkAllAsRead = () => {
    onMarkAllAsRead();
    onClose();
  };

  return (
    <Drawer
      radius="none"
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      size="md" // md for large screens
      classNames={{
        base: "sm:max-w-md max-w-xs", // xs size for small screens
        wrapper: "overflow-hidden",
      }}
    >
      <DrawerContent>
        <DrawerHeader className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Notifications</h3>
        </DrawerHeader>

        <DrawerBody className="flex-1 p-0">
          {mockNotifications.length > 0 ? (
            <ScrollArea className="h-full">
              <div className="p-3 space-y-3">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={clsx(
                      "p-3 rounded-lg cursor-pointer hover:bg-default-50 transition-colors border-l-4",
                      notification.read
                        ? "border-transparent bg-default-25"
                        : "border-green-500 bg-green-50"
                    )}
                    onClick={() => {
                      console.log("Notification clicked:", notification.id);
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className={clsx(
                        "text-sm font-medium line-clamp-2",
                        !notification.read && "font-semibold text-blue-900"
                      )}>
                        {notification.title}
                      </h4>
                      <span className="flex-shrink-0 ml-2 text-xs text-gray-500">
                        {notification.time}
                      </span>
                    </div>
                    <p className={clsx(
                      "text-sm line-clamp-3",
                      notification.read ? "text-gray-600" : "text-blue-800"
                    )}>
                      {notification.message}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center flex-1 p-8">
              <div className="text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="mb-2 text-lg font-medium">No notifications</p>
                <p className="text-sm">You're all caught up!</p>
              </div>
            </div>
          )}
        </DrawerBody>

        {mockNotifications.length > 0 && (
          <DrawerFooter className="p-4 border-t">
            <Button
              variant="flat"
              color="success"
              className="w-full"
              onPress={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};