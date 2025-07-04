import { Children, useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

// Reusable TreeItem component
const TreeItem = ({ label, link, children }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (children) setOpen(!open);
  };

  return (
    <div className="pl-2">
      <div
        className="flex items-center gap-2 cursor-pointer select-none py-2 px-2 rounded-md transition duration-200 hover:bg-blue-100"
        onClick={handleClick}
      >
        {children ? (
          open ? (
            <FaFolderOpen className="text-[#151b54]" />
          ) : (
            <FaFolder className="text-[#151b54]" />
          )
        ) : (
          <FaFolder className="text-[#151b54]" />
        )}

        {link ? (
          <Link
            to={link}
            className="text-sm font-medium text-[#151b54] no-underline hover:no-underline w-full"
          >
            {label}
          </Link>
        ) : (
          <span className="text-sm font-medium text-[#151b54]">{label}</span>
        )}
      </div>

      {open && children && (
        <div className="ml-4">
          {children.map((child, idx) => (
            <TreeItem
              key={idx}
              label={child.label}
              link={child.link}
              children={child.children}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Sidebar menu data
const menuData = [
  {
    label: "Client",
    link: "/client",
  },
  {
    label: "Company",
    link: "/company",
  },
  {
    label: "Company Code",
    link: "/company-code",
  },
  {
    label: "Business Area",
    link: "/business-area",
  },
  {
    label: "Plant",
    link: "/plant",
  },
  {
    label: "Enterprise Structure",
    link: "/enterprise-structure",
  },
  {
    label: "General Ledger Account (FI-GL)",
    children: [
      { label: "Create GL Account", link: "/general-ledger" },
      { label: "POST / EDIT / DELETE GL Account", link: "/glaccount-details" },
      { label: "GL Account Status", link: "/gl-status" },
    ],
  },
  // {
  //   label: "Chart of Accounts (CoA)",
  //   children: [
  //     { label: "CoA List", link: "/tools/coa-list" },
  //     { label: "Create CoA", link: "/tools/create-coa" },
  //   ],
  // },
  // {
  //   label: "Field Status Group (FSG)",
  //   link: "/field-status-group",
  // },
  {
    label: "Journal Entry",
    link: "/journal-entry",
  },
];

export default function ResizableSAPSidebar() {
  return (
    <div
      className="fixed top-0 left-0 h-screen z-50 border-r bg-gradient-to-b from-blue-50 to-white shadow-md"
      style={{ width: 300 }}
    >
      {/* Header */}
      <div className="w-full border-b p-4 text-center font-bold text-lg bg-white shadow-sm sticky top-0 text-[#151b54]">
        AERP
      </div>

      {/* Scrollable Content (Y and X) */}
      <div className="overflow-x-auto overflow-y-auto h-[calc(100vh-64px)] p-3 text-[#151b54]">
        <div className="min-w-[300px]">
          {menuData.map((section, idx) => (
            <TreeItem
              key={idx}
              label={section.label}
              link={section.link}
              children={section.children}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
