import React from "react";
import { Clock, Users } from "lucide-react";

interface Auction {
  id: string;
  carModel: string;
  year: number;
  currentBid: number;
  timeLeft: string;
  bidders: number;
  image: string;
}

const liveAuctions: Auction[] = [
  {
    id: "1",
    carModel: "2020 Tesla Model S",
    year: 2020,
    currentBid: 75000,
    timeLeft: "2h 15m",
    bidders: 12,
    image:
      "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "2",
    carModel: "2019 BMW M3",
    year: 2019,
    currentBid: 68500,
    timeLeft: "4h 32m",
    bidders: 8,
    image:
      "https://images.pexels.com/photos/892618/pexels-photo-892618.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "3",
    carModel: "2021 Audi RS6",
    year: 2021,
    currentBid: 89000,
    timeLeft: "1h 45m",
    bidders: 15,
    image:
      "https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

export const LiveAuctions: React.FC = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Live Auctions
      </h3>
      <div className="space-y-4">
        {liveAuctions.map((auction) => (
          <div
            key={auction.id}
            className="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 transition-colors duration-200"
          >
            <img
              src={auction.image}
              alt={auction.carModel}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate">
                {auction.carModel}
              </h4>
              <p className="text-lg font-bold text-blue-600">
                ${auction.currentBid.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <div className="flex items-center space-x-1 text-orange-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{auction.timeLeft}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <Users className="w-4 h-4" />
                <span className="text-sm">{auction.bidders}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
        View All Auctions
      </button>
    </div>
  );
};
