import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavLink } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Minus,
  LayoutDashboard,
  Users,
  Network,
  Sun,
  Settings,
  SquareUserRound,
  CircleGauge,
  HandCoins,
  AlignStartVertical,
  CircleChevronLeft,
  UsersRound,
  Notebook,
  ReceiptText,
  Flower,
  Paperclip,
  ClipboardPlus,
  ClipboardMinus,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlignJustify } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import { IoLogoSlack } from "react-icons/io";

const MobileSidebar = ({ open, setOpen }) => {
  const [activeParent, setActiveParent] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.user?.role?.name;
  const projectName = import.meta.env.VITE_PROJECT_NAME;

  // const items = [
  //   {
  //     name: "Home",
  //     path: "/",
  //     logo: <LayoutDashboard size={20} />,
  //   },
  //   {
  //     name: "User Management",
  //     path: "#",
  //     logo: <Users size={20} />,
  //     children: [
  //       {
  //         name: "Roles",
  //         path: "/roles",
  //         logo: <IoLogoSlack />,
  //       },
  //       {
  //         name: "Users",
  //         path: "/users",
  //         logo: <IoLogoSlack />,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Masters",
  //     path: "#",
  //     logo: <Settings size={16} />,
  //     children: [
  //       {
  //         name: "Devtas",
  //         path: "/devtas",
  //         logo: <Sun />,
  //       },
  //       {
  //         name: "Pooja Types",
  //         path: "/pooja_types",
  //         logo: <Sun />,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Denominations",
  //     path: "/denominations",
  //     logo: <HandCoins size={16} />,
  //   },
  //   {
  //     name: "Services",
  //     path: "/services",
  //     logo: <Network size={20} />,
  //   },
  //   {
  //     name: "Contact",
  //     path: "/contact",
  //     logo: <SquareUserRound size={20} />,
  //   },
  // ];
  const adminItems = [
    {
      name: "Dashboard",
      path: "/",
      logo: <LayoutDashboard size={16} />,
    },
    {
      name: "Masters",
      path: "#",
      logo: <Settings size={16} />,
      children: [
        {
          name: "Devtas",
          path: "/devtas",
          logo: <Sun size={16} />,
        },
        {
          name: "Pooja Types",
          path: "/pooja_types",
          logo: <AlignStartVertical size={16} />,
        },
        {
          name: "Pooja Dates",
          path: "/pooja_dates",
          logo: <Settings size={16} />,
        },
        {
          name: "Receipt types",
          path: "/receipt_types",
          logo: <ReceiptText size={16} />,
        },
        {
          name: "Gurujis",
          path: "/gurujis",
          logo: <Flower size={16} />,
        },
      ],
    },
    {
      name: "User Management",
      path: "#",
      logo: <Users size={16} />,
      children: [
        {
          name: "Permissions",
          path: "/permissions",
          logo: <Paperclip size={16} />,
        },
        {
          name: "Roles",
          path: "/roles",
          logo: <Notebook size={16} />,
        },
        {
          name: "Users",
          path: "/users",
          logo: <UsersRound size={16} />,
        },
      ],
    },
    {
      name: "Reports",
      path: "#",
      logo: <ClipboardPlus size={16} />,
      children: [
        {
          name: "Anteshtee Report",
          path: "/anteshtee_report",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "Gotravali",
          path: "/gotravali_report",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "Gotravali Summary",
          path: "/gotravali_summary_report",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "Receipt Report",
          path: "/receipts_report",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "All Receipts",
          path: "/all_receipts",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "Receipt Summary",
          path: "/receipt_summary",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "Receipt Total Summary",
          path: "/receipt_total_summary",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "Cheque Collection",
          path: "/cheque_collection_report",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "UPI Collection",
          path: "/upi_collection_report",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "Khat Report",
          path: "/khat_report",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "Naral Report",
          path: "/naral_report",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "Cancelled Receipt Report",
          path: "/cancelled_receipt_report",
          logo: <ClipboardMinus size={16} />,
        },
      ],
    },
    {
      name: "Denominations",
      path: "/denominations",
      logo: <HandCoins size={16} />,
    },
    {
      name: "Receipts",
      path: "/receipts",
      logo: <ReceiptText size={16} />,
    },
  ];

  const limitedItems = [
    {
      name: "Dashboard",
      path: "/",
      logo: <LayoutDashboard size={16} />,
    },
    {
      name: "Masters",
      path: "#",
      logo: <Settings size={16} />,
      children: [
        {
          name: "Gurujis",
          path: "/gurujis",
          logo: <Flower size={16} />,
        },
      ],
    },
    {
      name: "Reports",
      path: "#",
      logo: <ClipboardPlus size={16} />,
      children: [
        {
          name: "Anteshtee Report",
          path: "/anteshtee_report",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "Gotravali",
          path: "/gotravali_report",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "Gotravali Summary",
          path: "/gotravali_summary_report",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "Receipt Report",
          path: "/receipts_report",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "All Receipts",
          path: "/all_receipts",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "Receipt Summary",
          path: "/receipt_summary",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "Receipt Total Summary",
          path: "/receipt_total_summary",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "Cheque Collection",
          path: "/cheque_collection_report",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "UPI Collection",
          path: "/upi_collection_report",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "Khat Report",
          path: "/khat_report",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "Naral Report",
          path: "/naral_report",
          logo: <ClipboardMinus size={16} />,
        },
        {
          name: "Cancelled Receipt Report",
          path: "/cancelled_receipt_report",
          logo: <ClipboardMinus size={16} />,
        },
      ],
    },
    {
      name: "Denominations",
      path: "/denominations",
      logo: <HandCoins size={16} />,
    },
    {
      name: "Receipts",
      path: "/receipts",
      logo: <ReceiptText size={16} />,
    },
  ];

  const items = role === "admin" ? adminItems : limitedItems;

  const toggleChildren = (itemName) => {
    setActiveParent((prev) => (prev === itemName ? null : itemName)); // If same item clicked, close, else open it
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className=" block md:hidden">
            <AlignJustify className="text-black dark:text-white" size={48} />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="text-white bg-dark-purple dark:bg-background"
        >
          <SheetHeader>
            <SheetTitle className="text-left mb-10">
              <div className="flex gap-3 p-1 text-sm items-center text-white">
                {" "}
                <LayoutDashboard />
                {/* श्री गणेश मंदिर संस्थान, डोंबिवली */}
                {projectName}
              </div>{" "}
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full pr-3">
            <ul className="pb-32 ">
              {/* mt-10 about */}
              {items.map((item, index) => {
                return (
                  <div key={index}>
                    {/* Parent item */}
                    {item.children ? (
                      <NavLink
                        className=" flex my-2 text-base px-1 py-2 hover:bg-dark-purple-light dark:hover:bg-gray-600 rounded items-center"
                        to={item.path || "#"}
                        onClick={() =>
                          item.children && toggleChildren(item.name)
                        } // Toggle children visibility on click
                      >
                        <p className="text-xl px-1">{item.logo}</p>
                        <div
                          className={`w-full px-2 flex justify-between items-center`}
                        >
                          <p className="">{item.name}</p>
                          {item.children && (
                            <p>
                              <IoIosArrowDown
                                className={`${
                                  item.children &&
                                  activeParent === item.name &&
                                  "rotate-180"
                                }`}
                              />
                            </p>
                          )}
                        </div>
                      </NavLink>
                    ) : (
                      <NavLink
                        className={({ isActive }) =>
                          ` flex my-2 px-1  py-2  hover:bg-dark-purple-light dark:hover:bg-gray-600  text-base rounded items-center ${
                            isActive && "bg-dark-purple-light  dark:bg-gray-600"
                          }`
                        }
                        to={item.path || "#"}
                        onClick={() =>
                          item.children && toggleChildren(item.name)
                        } // Toggle children visibility on click
                      >
                        <p className="text-xl px-1">{item.logo}</p>
                        <div
                          className={`w-full px-2 flex justify-between items-center`}
                        >
                          <p>{item.name}</p>
                          {item.children && (
                            <p>
                              <IoIosArrowDown
                                className={`${
                                  item.children &&
                                  activeParent === item.name &&
                                  "rotate-180"
                                }`}
                              />
                            </p>
                          )}
                        </div>
                      </NavLink>
                    )}
                    {/* Render children if the parent item has children and it's the active one */}
                    {item.children && activeParent === item.name && (
                      <div>
                        {item.children.map((child, idx) => (
                          <NavLink
                            key={idx}
                            className={({ isActive }) =>
                              ` ${
                                isActive &&
                                " bg-dark-purple-light  dark:bg-gray-600"
                              } pl-8 w-full py-2 my-2 gap-2 hover:bg-dark-purple-light dark:hover:bg-gray-600  rounded flex items-center text-sm`
                            }
                            to={child.path}
                          >
                            <p className="">
                              <Minus size={16} />
                            </p>
                            <p
                              className={`
                           text-sm`}
                            >
                              {child.name}
                            </p>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </ul>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;

{
  /* duration-300 transition-all pt-3.5  min-h-screen dark:bg-gray-800 bg-white */
}
