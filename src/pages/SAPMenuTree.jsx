import { useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";

// Reusable TreeItem component
const TreeItem = ({ label, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="pl-4">
      <div
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaFolderOpen /> : <FaFolder />}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {open && <div className="ml-2 mt-1">{children}</div>}
    </div>
  );
};

// Menu data
const menuData = [
  {
    label: "Z_Codes",
    children: [
      {
        label: "MM Codes",
        items: [
          "ME21N - Create Purchase Order",
          "MIGO - Goods Movement",
          "MIRO - Enter Incoming Invoice",
        ],
      },
      {
        label: "SD Codes",
        items: ["XD01 - Create Customer", "VA01 - Create Sales Order"],
      },
      {
        label: "PP Codes",
        items: ["COR1 - Create Process Order", "CO01 - Production Order"],
      },
      {
        label: "FI Codes",
        items: ["FK01 - Create Vendor", "FTXP - Maintain Tax Code"],
      },
    ],
  },
  { label: "Office" },
  { label: "Cross-Application Components" },
  { label: "Logistics" },
  { label: "Accounting" },
  { label: "Human Resources" },
  { label: "Information Systems" },
  { label: "Tools" },
];

export default function SAPMenuTree() {
  return (
    <div className="w-full max-w-md p-4 bg-blue-50 border border-gray-300 rounded text-blue-900">
      {menuData.map((section, idx) => (
        <TreeItem key={idx} label={section.label}>
          {section.children?.map((sub, subIdx) => (
            <TreeItem key={subIdx} label={sub.label}>
              {sub.items?.map((item, i) => (
                <div key={i} className="ml-7 text-sm">
                  {item}
                </div>
              ))}
            </TreeItem>
          ))}
        </TreeItem>
      ))}
    </div>
  );
}
