import React, { useState, useMemo, useRef } from "react";
import StatCard from "../components/StatCard";
import {
  Car,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  User,
  X,
  Check,
  Calendar,
  Palette,
  CircleDollarSign,
  Info,
} from "lucide-react";
import Select from "react-select";
import LogEntry from "./LogEntry";
import { finalEntry, historyGroups } from "./carhistory";
import highlightMatch from "./highlight";
interface Vehicle {
  id: number;
  run: number;
  lin: number;
  vin: string;
  year: number;
  make: string;
  model: string;
  color: string;
  company: string;
  buyNow: boolean;
  preBid: boolean;
  auction: number;
  date: string;
  paddle: string;
  buyerId: string;
  transId: number;
  customerName: string;
  paymentStatus: "paid" | "partial" | "unpaid";
  soldPrice: number;
  soldBy: string;
  owner: string;
  gatePass: string | null;
  receivedPaymentBy: string | null;
  linkedBy: string | undefined;
  invoiceNumber: string;
}

// Reusable Icon components for clarity and reusability

// Reusable Button Component
type PaymentStatus = "paid" | "partial" | "unpaid";

const vehicles: Vehicle[] = [
  {
    id: 1,
    run: 123,
    lin: 71179,
    vin: "SN1AT2MT3EC795462",
    year: 2014,
    make: "NISSAN",
    model: "ROGUE",
    color: "WHITE",
    company: "MARHABA AUCTIONS LLC",
    buyNow: false,
    preBid: false,
    auction: 1030,
    date: "2025-06-22",
    paddle: "550",
    buyerId: "2437213",
    transId: 0,
    customerName: "",
    paymentStatus: "paid",
    receivedPaymentBy: "Ahmed Abdullah",
    soldPrice: 15500,
    owner: "John Doe",
    soldBy: "Sarah Ahmed",
    linkedBy: "",
    gatePass: "G-12345",
    invoiceNumber: "INV-1234567",
  },

  ...Array.from({ length: 50 }, (_, i) => {
    const paymentStatus: PaymentStatus = ["paid", "partial", "unpaid"][
      Math.floor(Math.random() * 3)
    ] as PaymentStatus;

    const receivedPaymentBy =
      paymentStatus === "paid" || paymentStatus === "partial"
        ? [
            "John Smith",
            "Ahmed Ali",
            "Sarah Johnson",
            "Mohammad Hassan",
            "David Wilson",
          ][Math.floor(Math.random() * 5)]
        : null;

    const invoiceNumber =
      paymentStatus === "paid" || paymentStatus === "partial"
        ? `INV-${Math.floor(Math.random() * 900000 + 100000)}`
        : "";

    const gatePass =
      paymentStatus === "paid"
        ? `G-${Math.floor(Math.random() * 900000 + 100000)}`
        : "";

    return {
      id: i + 2,
      run: Math.floor(Math.random() * 200) + 1,
      lin: Math.floor(Math.random() * 80000) + 60000,
      invoiceNumber,
      gatePass,
      vin: `VIN${String(i + 9).padStart(13, "0")}`,
      year: 2010 + Math.floor(Math.random() * 15),
      make: [
        "TOYOTA",
        "HONDA",
        "NISSAN",
        "BMW",
        "MERCEDES BENZ",
        "AUDI",
        "KIA",
        "HYUNDAI",
      ][Math.floor(Math.random() * 8)],
      model: [
        "CAMRY",
        "ACCORD",
        "ALTIMA",
        "328i",
        "C-CLASS",
        "A4",
        "OPTIMA",
        "ELANTRA",
      ][Math.floor(Math.random() * 8)],
      color: ["WHITE", "BLACK", "SILVER", "BLUE", "RED", "GRAY"][
        Math.floor(Math.random() * 6)
      ],
      company: "MARHABA AUCTIONS LLC",
      buyNow: Math.random() > 0.8,
      preBid: Math.random() > 0.7,
      auction: 1030 - Math.floor(Math.random() * 3),
      date: "2025-06-21",
      paddle:
        Math.random() > 0.5
          ? String(Math.floor(Math.random() * 1000) + 100)
          : `MAHBM${Math.floor(Math.random() * 100000)}`,
      buyerId: (Math.floor(Math.random() * 1000000) + 2000000).toString(),
      transId:
        Math.random() > 0.3 ? Math.floor(Math.random() * 200000) + 100000 : 0,
      customerName: [
        "John Smith",
        "Ahmed Ali",
        "Sarah Johnson",
        "Mohammad Hassan",
        "David Wilson",
      ][Math.floor(Math.random() * 5)],
      paymentStatus,
      receivedPaymentBy,
      soldPrice: Math.floor(Math.random() * 50000) + 10000,
      owner: [
        "Joe Frazier",
        "Ahmed Abdullah",
        "Sarah Ahmed",
        "Mohammad Hassan",
        "David Goggins",
      ][Math.floor(Math.random() * 5)],
      soldBy: [
        "Joe Frazier",
        "Ahmed Abdullah",
        "Sarah Ahmed",
        "Mohammad Hassan",
        "David Goggins",
      ][Math.floor(Math.random() * 5)],
      linkedBy: [
        "Joe Frazier",
        "Ahmed Abdullah",
        "Sarah Ahmed",
        "Mohammad Hassan",
        "David Goggins",
      ][Math.floor(Math.random() * 5)],
    };
  }),
];

const customerOptions = [
  {
    value: "john-doe",
    label: "John Doe",
    paddle: "P123",
    mobile: "0501234567",
  },
  {
    value: "jane-smith",
    label: "Jane Smith",
    paddle: "P456",
    mobile: "0509876543",
  },
  {
    value: "bob-johnson",
    label: "Bob Johnson",
    paddle: "P789",
    mobile: "0502468135",
  },
  {
    value: "alice-brown",
    label: "Alice Brown",
    paddle: "P321",
    mobile: "0501122334",
  },
  {
    value: "charlie-wilson",
    label: "Charlie Wilson",
    paddle: "P654",
    mobile: "0509988776",
  },
];

const SoldVehicles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  // const [soldFilter, setSoldFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(25);
  const [hoveredVin, setHoveredVin] = useState<string | null>(null);
  const [columnFilters, setColumnFilters] = useState({
    run: "",
    auction: "",
    date: "",
    lin: "",
    vin: "",
    year: "",
    make: "",
    model: "",
    color: "",
    company: "",
    paddle: "",
    buyerId: "",
    transId: "",
    customerName: "",
  });

  const [showhide, setshowhide] = useState(false);
  const [minHeight, setMinHeight] = useState(false)

  const [openGrid, setOpenGrid] = useState(false);
  const [buyNowFilter, setBuyNowFilter] = useState<"all" | "buy" | "notbuy">(
    "all"
  );

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const successDialogRef = useRef<HTMLDialogElement>(null);
  const [tooltipDirection, setTooltipDirection] = useState<"up" | "down">(
    "down"
  );
  const [history, setHistory] = useState({
    // auction: 6,
    // date: "",
    paymentStatus: "",
    // paymentReceived: "",
    // invoiceNumber: "",
    // color: "",
    // year: 1234,
    // model: "",
    // make: "",
    // gatePass: "",
    vin: "",
    // soldBy: "",
    // receivedPaymentBy: "",
  });
  const tableRef = useRef<HTMLDivElement>(null);

  const filterAction = (value) => {
    setFilterStatus(value);
  };

  const handleMouseEnter = (
    vin: string,
    e: React.MouseEvent<HTMLTableCellElement, MouseEvent>
  ) => {
    if (!tableRef.current) return;

    const tdRect = e.currentTarget.getBoundingClientRect();
    const tableRect = tableRef.current.getBoundingClientRect();

    const spaceAbove = tdRect.top - tableRect.top;
    const spaceBelow = tableRect.bottom - tdRect.bottom;

    // Estimate tooltip height or pick a reasonable value
    const estimatedTooltipHeight = 300;

    if (
      spaceBelow < estimatedTooltipHeight &&
      spaceAbove > estimatedTooltipHeight
    ) {
      setTooltipDirection("up");
    } else {
      setTooltipDirection("down");
    }

    setHoveredVin(vin);
  };

  const getCarInfo = (vin: string): Vehicle | undefined => {
    return vehicles.find((car) => car.vin === vin);
  };

  // Add this above the component
  const customFilter = (
    inputValue: string,
    option: { paddle: string; mobile: string }
  ) => {
    const query = inputValue;
    return option.paddle.includes(query) || option.mobile.includes(query);
  };

  const customFormatOptionLabel = ({ label, paddle, mobile }) => (
    <div>
      <div className="font-medium">{label}</div>
      <div className="text-sm text-gray-500">
        Paddle: {paddle} | Mobile: {mobile}
      </div>
    </div>
  );

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const handleAccept = () => {
    const isPartial = history.paymentStatus === "partial";
    if ((isPartial && amount) || (!isPartial && selectedCustomer && amount)) {
      dialogRef.current?.close();
      setSelectedCustomer("");
      setAmount("");
      successDialogRef.current?.showModal();
      setTimeout(() => {
        successDialogRef.current?.close();
      }, 1000);
    }
  };

  const handleCancel = () => {
    dialogRef.current?.close();
    setSelectedCustomer("");
    setAmount("");
  };

  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  // const handleButtonClick = (buttonName: string) => {
  //   // In a real app, you would have a more robust notification system
  //   // For this demo, we'll use a simple console log.
  //   console.log(`${buttonName} button clicked!`);
  // };

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      // 1. General Search Filter (no changes here)
      const matchesSearch =
        vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.paddle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.buyerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.customerName.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Dropdown Filters (no changes here)
      const matchesPaymentFilter =
        filterStatus === "all" || vehicle.paymentStatus === filterStatus;

      // 3. **FIXED**: Column-specific filtering logic
      const matchesColumnFilters = Object.entries(columnFilters).every(
        ([key, value]) => {
          if (value === "") return true; // If filter is empty, it's a match

          // Get the corresponding value from the vehicle object
          const vehicleValue = vehicle[key as keyof typeof columnFilters];

          // Compare the values (case-insensitive)
          return String(vehicleValue)
            .toLowerCase()
            .includes(String(value).toLowerCase());
        }
      );
      const matchesBuyNowFilter =
        buyNowFilter === "all" ||
        (buyNowFilter === "buy" && vehicle.buyNow) ||
        (buyNowFilter === "notbuy" && !vehicle.buyNow);

      // Return true only if all filter conditions are met
      return (
        matchesSearch &&
        matchesPaymentFilter &&
        matchesColumnFilters &&
        matchesBuyNowFilter
      );
    });
  }, [searchTerm, filterStatus, columnFilters, buyNowFilter]); // Dependency array is correct

  // ... (rest of the component state and functions are fine)
  // getStatusColor, getStatusIcon, handlePageChange, generatePageNumbers...
  const totalPages = Math.ceil(filteredVehicles.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentVehicles = filteredVehicles.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "partial":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "unpaid":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-3 w-3" />;
      case "partial":
        return <AlertCircle className="h-3 w-3" />;
      case "unpaid":
        return <CreditCard className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  // **IMPROVEMENT**: Create a reusable handler for column filters
  const handleColumnFilterKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    column: keyof typeof columnFilters
  ) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value;
      setColumnFilters((prev) => ({
        ...prev,
        [column]: value,
      }));
    }
  };

  const paid = vehicles.filter((v) => v.paymentStatus === "paid").length;
  const partial = vehicles.filter((v) => v.paymentStatus === "partial").length;
  const unpaid = vehicles.filter((v) => v.paymentStatus === "unpaid").length;

  return (
    <div className="space-y-6 flex flex-col">
      {/* ... (Header and StatCards are fine) ... */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Sold Vehicles</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all sold vehicle transactions
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button>
            <img className="size-6" src="/excel.svg" alt="" />
          </button>
          <button>
            <img className="size-6" src="/csv.svg" alt="" />
          </button>
          <button>
            <img className="size-6" src="/pdf.svg" alt="" />
          </button>
        </div>
      </div>
      <div className="">
        <h2 className="relative text-lg p-4 justify-end flex font-semibold text-gray-800 mb-4">
          <div
            // onMouseEnter={() => setToolTip(true)}
            // onMouseLeave={() => setToolTip(false)}
            className="p-3 group"
          >
            <Info className="size-6" />
            <div
              className={`w-full lg:left-[70%] md:left-[35%] left-[10%] transform -translate-y-1/2 top-1/2  hidden group-hover:block font-thin text-sm absolute`}
            >
              Click cards to filter based on status
            </div>
          </div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            filter={() => filterAction("all")}
            title="Total Sold"
            value={vehicles.length}
            icon={Car}
            color="blue"
          />
          <StatCard
            filter={() => filterAction("paid")}
            title="Full Paid"
            value={paid}
            icon={CheckCircle}
            color="green"
            trend={{
              value: parseFloat(((paid / vehicles.length) * 100).toFixed(1)),
              isPositive: true,
            }}
          />
          <StatCard
            filter={() => filterAction("partial")}
            title="Partial Paid"
            value={partial}
            icon={AlertCircle}
            color="orange"
            trend={{
              value: parseFloat(((partial / vehicles.length) * 100).toFixed(1)),
              isPositive: false,
            }}
          />
          <StatCard
            filter={() => filterAction("unpaid")}
            title="Unpaid"
            value={unpaid}
            icon={CreditCard}
            color="red"
            trend={{
              value: parseFloat(((unpaid / vehicles.length) * 100).toFixed(1)),
              isPositive: false,
            }}
          />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Display</span>
              <select
                value={recordsPerPage}
                onChange={(e) => {
                  setRecordsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-gray-600">Records Per Page</span>
            </div>
            <div>
              <button
                onClick={() => setshowhide((prev) => !prev)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2"
              >
                {showhide ? "Hide Car Details" : "Show Car Details"}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="vin, paddle, buyerID, Buyer Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-52 md:w-64 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="text-sm text-gray-600 bg-red-50 p-2 rounded-lg border border-red-200">
              <span className="font-medium text-red-700">
                Total: {filteredVehicles.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div
        ref={tableRef}
        className={`bg-white rounded-xl ${
          openGrid
            ? "grid grid-cols-[1fr_3fr]  md:grid-cols-[1fr_2fr] lg:grid-cols-[2fr_1fr]"
            : ""
        } min-h-0 flex-1 overflow-y-auto shadow-sm border border-gray-200`}
      >
        <div className={`overflow-x-auto ${minHeight ? "min-h-[400px]": "min-h-[0px]" } `}>
          <table>
            <thead className="bg-gray-50 border-b border-gray-200">
              {/* ... (table headers are fine) ... */}
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Run#
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  VIN
                </th>
                {showhide && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                )}
                {showhide && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Make
                  </th>
                )}
                {showhide && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Model
                  </th>
                )}
                {showhide && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Color
                  </th>
                )}
                {showhide && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company/Owner
                  </th>
                )}
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buy Now
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Auction
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paddle
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buyer ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buyer Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Filter inputs row */}
              <tr className="bg-gray-100">
                <td colSpan={1}></td>
                <td>
                  <input
                    type="text"
                    placeholder="Run#"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    onKeyDown={(e) => handleColumnFilterKeyDown(e, "run")}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    placeholder="VIN"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    onKeyDown={(e) => handleColumnFilterKeyDown(e, "vin")}
                  />
                </td>
                {showhide && (
                  <td>
                    <input
                      type="text"
                      placeholder="Year"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      onKeyDown={(e) => handleColumnFilterKeyDown(e, "year")}
                    />
                  </td>
                )}
                {showhide && (
                  <td>
                    <input
                      type="text"
                      placeholder="Make"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      onKeyDown={(e) => handleColumnFilterKeyDown(e, "make")}
                    />
                  </td>
                )}
                {showhide && (
                  <td>
                    <input
                      type="text"
                      placeholder="Model"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      onKeyDown={(e) => handleColumnFilterKeyDown(e, "model")}
                    />
                  </td>
                )}
                {showhide && (
                  <td>
                    <input
                      type="text"
                      placeholder="Color"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      onKeyDown={(e) => handleColumnFilterKeyDown(e, "color")}
                    />
                  </td>
                )}
                {showhide && (
                  <td>
                    <input
                      type="text"
                      placeholder="Company"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      onKeyDown={(e) => handleColumnFilterKeyDown(e, "company")}
                    />
                  </td>
                )}
                <td className="whitespace-nowrap px-3">
                  <div className="flex gap-3 justify-center text-sm">
                    <label className="flex flex-col-reverse items-center space-x-1">
                      <input
                        type="radio"
                        name="buyNowFilter"
                        value="all"
                        checked={buyNowFilter === "all"}
                        onChange={() => setBuyNowFilter("all")}
                      />
                      <span className="text-xs">All</span>
                    </label>

                    <label className="flex flex-col-reverse items-center space-x-1">
                      <input
                        type="radio"
                        name="buyNowFilter"
                        value="buy"
                        checked={buyNowFilter === "buy"}
                        onChange={() => setBuyNowFilter("buy")}
                      />
                      <span className="text-xs">Now</span>
                    </label>

                    <label className="flex flex-col-reverse justify-center space-x-1">
                      <input
                        type="radio"
                        name="buyNowFilter"
                        value="notbuy"
                        checked={buyNowFilter === "notbuy"}
                        onChange={() => setBuyNowFilter("notbuy")}
                      />
                      <span className="text-xs">Not Now</span>
                    </label>
                  </div>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Auction"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    onKeyDown={(e) => handleColumnFilterKeyDown(e, "auction")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Date"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    onKeyDown={(e) => handleColumnFilterKeyDown(e, "date")}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    placeholder="Paddle"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    onKeyDown={(e) => handleColumnFilterKeyDown(e, "paddle")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Buyer ID"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    onKeyDown={(e) => handleColumnFilterKeyDown(e, "buyerId")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Buyer Name"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    onKeyDown={(e) =>
                      handleColumnFilterKeyDown(e, "customerName")
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Invoice ID"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    onKeyDown={(e) => handleColumnFilterKeyDown(e, "transId")}
                  />
                </td>
                <td colSpan={2}></td>
              </tr>
              {/* Data rows */}
              {currentVehicles.map((vehicle, index) => (
                <tr
                  key={vehicle.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-blue-600">
                    {vehicle.run}
                  </td>
                  <td
                    onMouseEnter={(e) => {
                      handleMouseEnter(vehicle.vin, e)
                      setMinHeight(true)
                    }}
                    onMouseLeave={() => {
                      setHoveredVin(null)
                      setMinHeight(false)
                    }}
                    className="px-4 py-3 relative text-sm font-mono text-gray-900"
                  >
                    {highlightMatch(vehicle.vin, searchTerm)}

                    {/* Tooltip */}
                    {hoveredVin === vehicle.vin && (
                      <div
                        className={`absolute left-full mb-2 ${
                          tooltipDirection === "up"
                            ? "bottom-0 mb-2"
                            : "top-0 mt-2"
                        }`}
                      >
                        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 min-w-[280px] transition-all duration-200 ease-out">
                          {(() => {
                            const carInfo = getCarInfo(vehicle.vin);
                            if (!carInfo) return null;

                            return (
                              <div className="space-y-3">
                                <div className="border-b border-gray-100 pb-2">
                                  <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                                    Vehicle Details
                                  </h4>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center space-x-3">
                                    <Calendar className="w-4 h-4 text-blue-500" />
                                    <div>
                                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                                        Year
                                      </span>
                                      <p className="font-semibold text-gray-800">
                                        {carInfo.year}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-3">
                                    <Car className="w-4 h-4 text-green-500" />
                                    <div>
                                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                                        Make & Model
                                      </span>
                                      <p className="font-semibold text-gray-800">
                                        {carInfo.make} {carInfo.model}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-3">
                                    <Palette className="w-4 h-4 text-purple-500" />
                                    <div>
                                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                                        Color
                                      </span>
                                      <p className="font-semibold text-gray-800">
                                        {carInfo.color}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-3">
                                    <User className="w-4 h-4 text-orange-500" />
                                    <div>
                                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                                        Owner/Seller
                                      </span>
                                      <p className="font-semibold text-gray-800">
                                        {carInfo.owner}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    )}
                  </td>
                  {showhide && (
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {vehicle.year}
                    </td>
                  )}
                  {showhide && (
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {vehicle.make}
                    </td>
                  )}
                  {showhide && (
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {vehicle.model}
                    </td>
                  )}
                  {showhide && (
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {vehicle.color}
                    </td>
                  )}
                  {showhide && (
                    <td
                      className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate"
                      title={vehicle.company}
                    >
                      {vehicle.company}
                    </td>
                  )}
                  <td className="px-4 py-3 text-center">
                    {vehicle.buyNow && (
                      <div className="w-4 h-4 bg-green-500 rounded mx-auto"></div>
                    )}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-900">
                    {vehicle.auction}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {vehicle.date}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {highlightMatch(vehicle.paddle, searchTerm)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {highlightMatch(vehicle.buyerId, searchTerm)}
                  </td>
                  <td
                    className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate"
                    title={vehicle.customerName}
                  >
                    {highlightMatch(vehicle.customerName, searchTerm)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {vehicle.transId || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        vehicle.paymentStatus
                      )}`}
                    >
                      {getStatusIcon(vehicle.paymentStatus)}
                      <button
                        onClick={() => {
                          setHistory((prev) => ({
                            ...prev,
                            // auction: vehicle.auction,
                            // date: vehicle.date,
                            paymentStatus: vehicle.paymentStatus,
                            // paymentReceived: vehicle.soldPrice.toString(), // assuming paymentReceived is string
                            // invoiceNumber: `INV-${vehicle.id}`, // or whatever format you want
                            vin: vehicle.vin,
                            // soldBy: vehicle.soldBy,
                            // gatePass: vehicle.gatePass ?? "",
                          }));
                          if (vehicle.paymentStatus === "unpaid") {
                            return;
                          }

                          setOpenGrid(true);
                        }}
                      >
                        <span className="capitalize">
                          {vehicle.paymentStatus === "paid"
                            ? "full paid"
                            : vehicle.paymentStatus}
                        </span>
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {vehicle.paymentStatus !== "paid" && (
                      <button
                        onClick={() => {
                          setHistory((prev) => ({
                            ...prev,
                            // auction: vehicle.auction,
                            // date: vehicle.date,
                            paymentStatus: vehicle.paymentStatus,
                            // paymentReceived: vehicle.soldPrice.toString(), // assuming paymentReceived is string
                            // invoiceNumber: `INV-${vehicle.id}`, // or whatever format you want
                            // color: vehicle.color,
                            // year: vehicle.year,
                            // model: vehicle.model,
                            // make: vehicle.make,
                            vin: vehicle.vin,
                            // soldBy: vehicle.soldBy,
                            // receivedPaymentBy: vehicle.receivedPaymentBy ?? "",
                            // gatePass: vehicle.gatePass ?? "",
                          }));
                          openDialog();
                        }}
                        className="border px-2 py-1 rounded-md border-black flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                      >
                        <CircleDollarSign className="size-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className={`${
            openGrid ? "" : "hidden"
          } rounded-3xl shadow-xl min-h-0 overflow-y-auto bg-gray-100`}
        >
          <div className="bg-gray-50">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r justify-between flex items-center from-slate-800 to-slate-700 px-6 py-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Car History</h2>
                  <p className="text-slate-300 text-sm mt-1">
                    VIN: {history.vin}
                  </p>
                </div>
                <button
                  onClick={() => setOpenGrid((prev) => !prev)}
                  className="self-start text-white"
                >
                  <X></X>
                </button>
              </div>

              {/* History Content */}
              <div className="p-2 max-h-full overflow-y-auto">
                <div className="space-y-6">
                  {history.paymentStatus === "paid" ? (
                    historyGroups.map((group, groupIndex) => (
                      <div key={group.id} className="space-y-3">
                        {group.entries.map((entry, entryIndex) => (
                          <LogEntry
                            key={entry.id}
                            entry={entry}
                            isLast={
                              entryIndex === group.entries.length - 1 &&
                              groupIndex === historyGroups.length - 1
                            }
                          />
                        ))}

                        {groupIndex < historyGroups.length - 1 && (
                          <div className="flex items-center my-6">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                            <div className="px-4 text-xs text-gray-500 font-medium bg-white">
                              Next Session
                            </div>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                          </div>
                        )}
                      </div>
                    )) // ❌ Not Fully Paid: Only show the first entry from the first group
                  ) : (
                    <div className="space-y-3">
                      {historyGroups
                        .find((group) => group.id === 1)
                        ?.entries.map((entry, entryIndex, arr) => (
                          <LogEntry
                            key={entry.id}
                            entry={entry}
                            isLast={entryIndex === arr.length - 1}
                          />
                        ))}
                    </div>
                  )}

                  {/* Final Entry */}
                  {history.paymentStatus === "paid" && (
                    <div className="pt-4 border-t-2 border-dashed border-gray-200">
                      <LogEntry entry={finalEntry} isLast={true} />
                    </div>
                  )}
                </div>

                {(history.paymentStatus === "partial" ||
                  history.paymentStatus === "unpaid") && (
                  <div className="flex mt-4 text-sm justify-center gap-3">
                    <button
                      onClick={() => dialogRef.current?.showModal()}
                      className="px-3 py-2 rounded-full bg-green-300"
                    >
                      Add payment
                    </button>
                  </div>
                )}

                {history.paymentStatus === "paid" && (
                  <div className="flex mt-4 text-sm justify-center gap-3">
                    <button
                      // onClick={() => dialogRef.current?.showModal()}
                      className="px-3 py-2 rounded-full bg-green-300"
                    >
                      Re-create Gate Pass
                    </button>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Last updated: 2025-03-30 11:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ... (Pagination is fine) ... */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(endIndex, filteredVehicles.length)}
            </span>{" "}
            of <span className="font-medium">{filteredVehicles.length}</span>{" "}
            results
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center space-x-1">
              {generatePageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && handlePageChange(page)
                  }
                  disabled={page === "..."}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    page === currentPage
                      ? "bg-red-600 text-white"
                      : page === "..."
                      ? "text-gray-400 cursor-default"
                      : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* link customer dialog */}

      <dialog
        ref={dialogRef}
        onClick={handleDialogClick}
        className="backdrop:bg-black backdrop:bg-opacity-50 bg-transparent p-0 max-w-md w-full rounded-2xl shadow-2xl open:animate-in open:fade-in open:duration-200"
      >
        <div className="bg-white rounded-2xl w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Sold Vehicle Process
              </h2>
            </div>
            <button
              onClick={handleCancel}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-4">
              {/* Customer Select Field */}
              {history.paymentStatus !== "partial" && (
                <div>
                  <label
                    htmlFor="customer-select"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Customer
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Select
                      inputId="customer-select"
                      options={customerOptions}
                      value={
                        customerOptions.find(
                          (c) => c.value === selectedCustomer
                        ) || null
                      }
                      onChange={(selectedOption) =>
                        setSelectedCustomer(selectedOption?.value ?? "")
                      }
                      filterOption={(option, rawInput) =>
                        customFilter(rawInput, option.data)
                      }
                      formatOptionLabel={customFormatOptionLabel}
                      placeholder="Search by paddle or mobile number"
                      isClearable
                      classNames={{
                        control: () => "py-1 border-gray-300 rounded-xl",
                        menu: () => "z-50",
                      }}
                    />

                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Amount Number Field */}
              <div>
                <label
                  htmlFor="amount-input"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                    $
                  </span>
                  <input
                    id="amount-input"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) =>
                      setAmount(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-gray-900"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 pt-0">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-3 text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleAccept}
              disabled={
                history.paymentStatus === "partial"
                  ? !amount
                  : !selectedCustomer || !amount
              }
              className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors duration-200"
            >
              Accept
            </button>
          </div>
        </div>
      </dialog>

      {/* success dialog */}
      <dialog
        ref={successDialogRef}
        className="backdrop:bg-black backdrop:bg-opacity-50 bg-transparent p-0 max-w-sm w-full rounded-2xl shadow-2xl open:animate-in open:fade-in open:duration-200"
      >
        <div className="bg-white rounded-2xl w-full p-4 flex flex-col text-center">
          {/* Success Icon */}
          <button
            onClick={() => successDialogRef.current?.close()}
            className="self-end"
          >
            <X></X>
          </button>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">
              {history.paymentStatus === "partial"
                ? "Received Payment"
                : "Link successful"}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {history.paymentStatus === "partial"
                ? "Congratulations Payment Received"
                : "Link successful"}
            </p>
          </div>
        </div>
      </dialog>
      {/* add self closing timeout for success alert card */}
    </div>
  );
};

export default SoldVehicles;
