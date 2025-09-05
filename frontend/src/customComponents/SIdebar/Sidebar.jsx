import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Minus,
  Settings,
  LayoutDashboard,
  Users,
  Sun,
  Network,
  SquareUserRound,
  AlignStartVertical,
  CircleChevronLeft,
  UsersRound,
  Notebook,
  HandCoins,
  ReceiptText,
  Flower,
  Paperclip,
  ClipboardPlus,
  ClipboardMinus,
  Calendar,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.user?.role?.name;
  const location = useLocation();
  const [activeParent, setActiveParent] = useState(null);
  const projectName = import.meta.env.VITE_PROJECT_NAME;

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
          name: "Anteshtee Amounts",
          path: "/anteshtees",
          logo: <Calendar size={16} />,
        },
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

  // Check if the parent item should be active
  const isParentActive = (children) => {
    return children?.some(
      (child) => location.pathname.startsWith(child.path) // Match starts with for nested routes
    );
  };

  // Update active parent on page load based on current URL
  useEffect(() => {
    const activeParent = items.find((item) => isParentActive(item.children));
    if (activeParent) {
      setActiveParent(activeParent.name);
    }
  }, [location.pathname]);

  const toggleChildren = (itemName) => {
    setActiveParent((prev) => (prev === itemName ? null : itemName));
  };

  return (
    <ScrollArea
      className={`${
        isSidebarOpen ? "w-80" : "w-16"
      } hidden md:block transition-all px-3.5 m-0 text-sm duration-300 pt-3.5  border border-dark-purple  min-h-screen bg-dark-purple dark:bg-background text-white`}
    >
      <div className="flex items-center gap-x-4 mt-4 ">
        <LayoutDashboard size={32} />
        {isSidebarOpen && (
          <span className="text-sm font-semibold">{projectName}</span>
        )}
      </div>
      <ul className="mt-6">
        {items.map((item, index) => {
          // const isActive =
          //   location.pathname === item.path || isParentActive(item.children);
          // const isActive =
          //   location.pathname.startsWith(item.path) ||
          //   isParentActive(item.children);
          const isActive =
            (item.path === "/" && location.pathname === "/") || // Dashboard link active only on exact `/`
            (item.path !== "/" && location.pathname.startsWith(item.path)) ||
            isParentActive(item.children);
          return (
            <li key={index}>
              <NavLink
                className={`flex my-1 items-center p-2 hover:bg-dark-purple-light dark:hover:bg-gray-600 rounded transition-all duration-300 ${
                  isActive ? "bg-dark-purple-light  dark:bg-gray-600" : ""
                }`}
                to={item.path || "#"}
                onClick={() => item.children && toggleChildren(item.name)}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-xl">{item.logo}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {isSidebarOpen && (
                  <span className="ml-4 font-medium">{item.name}</span>
                )}
                {item.children && (
                  <IoIosArrowDown
                    className={`ml-auto transition-transform ${
                      activeParent === item.name ? "rotate-180" : ""
                    } ${!isSidebarOpen && "hidden"} `}
                  />
                )}
              </NavLink>
              {item.children && (
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeParent === item.name
                      ? "max-h-full opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.children.map((child, idx) => {
                    // Check if child path matches the current location
                    const isChildActive = location.pathname.startsWith(
                      child.path
                    );

                    return (
                      <NavLink
                        key={idx}
                        className={`flex my-1 items-center gap-x-4 p-2  rounded-lg transition-all duration-300 ${
                          isChildActive
                            ? "bg-dark-purple-light dark:bg-gray-600"
                            : "hover:bg-dark-purple-light dark:hover:bg-gray-600"
                        } ${isSidebarOpen && "pl-8"}`}
                        to={child.path}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-xl">{child.logo}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{child.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        {isSidebarOpen && (
                          <span className="font-medium">{child.name}</span>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </ScrollArea>
  );
};

export default Sidebar;
//dcd
