// Real data from the provided images
export const auctionReportData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Total Cars Auctioned",
      data: [5810, 5456, 4914, 6195, 7333, 5456],
      backgroundColor: "rgba(59, 130, 246, 0.8)",
      borderColor: "rgba(59, 130, 246, 1)",
      borderWidth: 2,
    },
    {
      label: "Total Cars Sold",
      data: [1950, 2110, 1860, 760, 2240, 1610],
      backgroundColor: "rgba(239, 68, 68, 0.8)",
      borderColor: "rgba(239, 68, 68, 1)",
      borderWidth: 2,
    },
  ],
};

export const fullAuctionReportData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Total Marhaba Auctioned Cars",
      data: [2627, 2452, 2230, 3259, 3039, 2238],
      backgroundColor: "rgba(59, 130, 246, 0.8)",
      borderColor: "rgba(59, 130, 246, 1)",
      borderWidth: 2,
    },
    {
      label: "Total Marhaba Sold Cars",
      data: [950, 1200, 850, 1050, 900, 1100],
      backgroundColor: "rgba(239, 68, 68, 0.8)",
      borderColor: "rgba(239, 68, 68, 1)",
      borderWidth: 2,
    },
    {
      label: "Total Consignors Auctioned Cars",
      data: [2983, 2598, 2684, 2936, 4294, 3218],
      backgroundColor: "rgba(245, 158, 11, 0.8)",
      borderColor: "rgba(245, 158, 11, 1)",
      borderWidth: 2,
    },
    {
      label: "Total Consignors Sold Cars",
      data: [800, 650, 750, 850, 1000, 950],
      backgroundColor: "rgba(34, 197, 94, 0.8)",
      borderColor: "rgba(34, 197, 94, 1)",
      borderWidth: 2,
    },
  ],
};

export const branchSalesData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Main Branch",
      data: [1100, 1050, 850, 950, 1000, 900, 0, 0, 0, 0, 0, 0],
      borderColor: "rgba(239, 68, 68, 1)",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      fill: false,
      tension: 0.4,
    },
    {
      label: "Souq Branch",
      data: [450, 420, 350, 450, 580, 250, 0, 0, 0, 0, 0, 0],
      borderColor: "rgba(59, 130, 246, 1)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      fill: false,
      tension: 0.4,
    },
    {
      label: "Ind.12 Branch",
      data: [320, 380, 320, 380, 420, 350, 0, 0, 0, 0, 0, 0],
      borderColor: "rgba(34, 197, 94, 1)",
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      fill: false,
      tension: 0.4,
    },
    {
      label: "Al qouz Branch",
      data: [180, 250, 120, 220, 200, 80, 0, 0, 0, 0, 0, 0],
      borderColor: "rgba(245, 158, 11, 1)",
      backgroundColor: "rgba(245, 158, 11, 0.1)",
      fill: false,
      tension: 0.4,
    },
  ],
};

export const marhabaInventoryData = {
  labels: ["Purchased", "Sold", "Unsold"],
  datasets: [
    {
      data: [2836, 26225, 1078],
      backgroundColor: [
        "rgba(30, 64, 175, 0.8)",
        "rgba(34, 197, 94, 0.8)",
        "rgba(239, 68, 68, 0.8)",
      ],
      borderColor: [
        "rgba(30, 64, 175, 1)",
        "rgba(34, 197, 94, 1)",
        "rgba(239, 68, 68, 1)",
      ],
      borderWidth: 2,
      hoverOffset: 20,
    },
  ],
};

export const consignersInventoryData = {
  labels: ["Sold", "Unsold"],
  datasets: [
    {
      data: [16964, 6318],
      backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(239, 68, 68, 0.8)"],
      borderColor: ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)"],
      borderWidth: 2,
      hoverOffset: 20,
    },
  ],
};

export const customerData = {
  labels: ["KYC Updated", "No Buyer ID", "Signed Buyer Agreement"],
  datasets: [
    {
      data: [43861, 42861, 8009],
      backgroundColor: [
        "rgba(239, 68, 68, 0.8)",
        "rgba(245, 158, 11, 0.8)",
        "rgba(30, 64, 175, 0.8)",
      ],
      borderColor: [
        "rgba(239, 68, 68, 1)",
        "rgba(245, 158, 11, 1)",
        "rgba(30, 64, 175, 1)",
      ],
      borderWidth: 2,
    },
  ],
};
