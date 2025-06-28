import { useState, useRef, useEffect } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

// Reusable TreeItem component
const TreeItem = ({ label, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="pl-2">
      <div
        className="flex items-center gap-2 cursor-pointer select-none py-1"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaFolderOpen /> : <FaFolder />}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {open && <div className="ml-4">{children}</div>}
    </div>
  );
};

// Menu data
const menuData = [
  {
    label: "Client",
    children: [
      {
        label: "MM Codes",
        items: [
          { label: "ME21N - Create Purchase Order", link: "/me21n" },
          { label: "MIGO - Goods Movement", link: "/migo" },
          { label: "MIRO - Enter Incoming Invoice", link: "/miro" },
        ],
      },
      {
        label: "SD Codes",
        items: [
          { label: "XD01 - Create Customer", link: "/xd01" },
          { label: "VA01 - Create Sales Order", link: "/va01" },
        ],
      },
    ],
  },
  { label: "Company", link: "/accounting" },
  { label: "Company Code", link: "/hr" },
  { label: "Business Area", link: "/tools" },
  { label: "Plant", link: "/tools" },
  { label: "General Ledger Account (FI-GL)", link: "/tools" },
  { label: "Chart of Accounts (CoA)", link: "/tools" },
  { label: "Field Status Group (FSG)", link: "/tools" },
  { label: "Invoice Posting", link: "/tools" },
];

export default function ResizableSAPSidebar() {
  const [width, setWidth] = useState(300);
  const sidebarRef = useRef();
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging.current) {
        const newWidth = e.clientX;
        if (newWidth >= 180 && newWidth <= 500) {
          setWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "default";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
    document.body.style.cursor = "ew-resize";
  };

  return (
    <div
      ref={sidebarRef}
      className="fixed top-0 left-0 h-screen z-50 border-r border-gray-300 bg-white overflow-x-auto overflow-y-auto relative"
      style={{ width }}
    >
      <div className="absolute top-0 left-0 w-full border-b-4 border-black p-2 text-center font-bold text-lg bg-white z-10">
        AERP
      </div>

      {/* Scrollable Menu Content below AERP */}
      <div className="p-3 pt-12 min-w-[280px] text-blue-900">
        {menuData.map((section, idx) => (
          <TreeItem key={idx} label={section.label}>
            {section.children?.map((sub, subIdx) => (
              <TreeItem key={subIdx} label={sub.label}>
                {sub.items?.map((item, i) => (
                  <div key={i} className="ml-4 my-1">
                    <Link
                      to={item.link}
                      className="text-sm text-blue-700 hover:underline block"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </TreeItem>
            )) ||
              (section.link && (
                <div className="ml-4 my-1">
                  <Link
                    to={section.link}
                    className="text-sm text-blue-700 hover:underline block"
                  >
                    {section.label}
                  </Link>
                </div>
              ))}
          </TreeItem>
        ))}
      </div>

      {/* Resizable drag handle */}
      <div
        onMouseDown={handleMouseDown}
        className="absolute right-0 top-0 h-full w-2 bg-gray-300 hover:bg-gray-500 cursor-ew-resize"
      />
    </div>
  );
}
