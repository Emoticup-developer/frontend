import { useState } from "react";
import { FaEdit } from "react-icons/fa";

const DefineCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     // Fetch company data from API
  //     const fetchCompanies = async () => {
  //       try {
  //         const response = await axios.get(
  //           "http://your-api-url.com/api/companies/"
  //         );
  //         setCompanies(response.data); // adjust based on your API response shape
  //       } catch (error) {
  //         console.error("Error fetching companies:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchCompanies();
  //   }, []);

  const [formData, setFormData] = useState({
    company: "",
    companyName: "",
    companyName2: "",
    street: "",
    poBox: "",
    postalCode: "",
    city: "",
    country: "",
    languageKey: "",
    currency: "",
  });

  return (
    <div>
      <div className="flex flex-col min-h-screen w-full bg-gray-50 font-sans text-xs">
        <div className="flex-grow w-full bg-[#f0f4f8] text-sm font-sans flex flex-col">
          <div className="h-full w-full bg-gray-100 shadow-md border border-gray-300 rounded-sm flex flex-col">
            <div className="bg-blue-200/80 p-2">
              <h2 className="text-sm font-sans">View Companies: Overview</h2>
            </div>

            <div className="bg-blue-100/80 p-1">
              <h2 className="text-xs font-sans">
                <a href="/create-company" className="flex items-center">
                  <FaEdit className="ml-3 mr-1" /> New Entries
                </a>
              </h2>
            </div>

            <div className="flex min-h-screen bg-gray-50 w-full">
              <div className="p-4 w-full">
                <div className="overflow-auto w-full border border-gray-400 shadow text-sm font-sans">
                  <table className="border-collapse table-fixed w-full">
                    <thead>
                      <tr className="bg-[#dfe6ed] font-semibold">
                        <th className="sticky left-0 bg-[#dfe6ed] border border-gray-400 px-2 py-1 w-[100px] z-10 text-left">
                          Company
                        </th>
                        <th className="border border-gray-400 px-2 py-1 min-w-[200px] text-left">
                          Company name
                        </th>
                        <th className="border border-gray-400 px-2 py-1 min-w-[200px] text-left">
                          Name of company 2
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td
                            colSpan="3"
                            className="text-center py-4 text-gray-500"
                          >
                            Loading...
                          </td>
                        </tr>
                      ) : (
                        companies.map((row, index) => (
                          <tr key={row.id || index} className="h-auto">
                            <td className="sticky left-0 z-10 bg-[#e6eff9] border border-gray-300 px-2 py-1 font-mono">
                              {row.companyCode}
                            </td>
                            <td
                              className={`border border-gray-300 px-2 py-1 ${
                                index === 0
                                  ? "bg-yellow-100 border border-yellow-300"
                                  : "bg-white"
                              }`}
                            >
                              {row.companyName}
                            </td>
                            <td className="border border-gray-300 px-2 py-1 bg-white">
                              {row.companyName2 || ""}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>

                  {/* Footer */}
                  <div className="flex items-center justify-between bg-[#e5edf6] px-2 py-1 border-t border-gray-300 text-xs">
                    <button className="bg-gray-200 px-2 py-0.5 border border-gray-400 shadow hover:bg-gray-300">
                      Position...
                    </button>
                    <span>Entry 1 of {companies.length || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefineCompany;
