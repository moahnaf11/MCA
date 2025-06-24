import React from "react";
import { DivideIcon as LucideIcon } from "lucide-react";

interface StatCardProps {
  filter?: () => void;
  title: string;
  value: string | number;
  icon?: LucideIcon;
  color: "red" | "blue" | "green" | "orange";
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  filter,
  title,
  value,
  icon: Icon,
  color,
  trend,
}) => {
  const colorClasses = {
    red: "bg-red-200 text-red-800",
    blue: "bg-blue-200 text-blue-800",
    green: "bg-green-200 text-green-800",
    orange: "bg-orange-200 text-orange-800",
  };

  return (
    <div
      onClick={() => filter()}
      className={`${colorClasses[color]} rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium opacity-90 mb-1">{title}</p>
          <p className="text-3xl font-bold mb-2">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {trend && (
            <div className={`text-xs flex items-center`}>
              <span>
                {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
