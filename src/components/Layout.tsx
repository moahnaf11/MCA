import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useMediaQuery } from "react-responsive";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isLaptop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [openmenu, setopenmenu] = useState(false);

  useEffect(() => {
    setopenmenu(isLaptop);
  }, [isLaptop]);
  return (
    <div className="flex relative h-screen bg-gray-50">
      {openmenu && <Sidebar setopenmenu={setopenmenu} />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setopenmenu={setopenmenu} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container flex flex-col mx-auto px-3 py-8 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
