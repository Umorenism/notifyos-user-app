// // src/components/dashboard/DashboardLayout.jsx
// import { Outlet } from "react-router-dom";
// import Sidebar from "./SideBar";
// import Header from "./Header";

// export default function DashboardLayout() {
//   return (
//     <div className="flex h-screen bg-[#f7f9fc]">
      
//       <aside className="w-72 bg-white shadow-sm z-20">
//         <Sidebar />
//       </aside>

//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

//         {/* Header */}
//         <Header />

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto p-6 md:p-8">
//           <Outlet />
//         </main>

//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import Header from "./Header";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f7f9fc] overflow-hidden">
      {/* Sidebar Drawer */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header with hamburger toggle */}
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}