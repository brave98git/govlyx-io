import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import DepartmentRequestModal from "../modals/DepartmentRequestModal";

const MainLayout = () => {
  const location = useLocation();
  return (
    <div className="drawer lg:drawer-open">
      <DepartmentRequestModal />
      {/* Drawer toggle */}
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content h-screen overflow-hidden">
        <motion.div
          className="h-screen bg-base-100 text-base-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Navbar */}
          <Navbar />

          {/* Layout area BELOW navbar */}
          <div className="pt-[calc(3.5rem+env(safe-area-inset-top,0px))] h-[calc(100dvh-(3.5rem+env(safe-area-inset-top,0px)))]">
            <div className="mx-auto max-w-[1780px] px-4 h-full">
              <div className="grid grid-cols-12 gap-4 mt-3 h-full">

                {/* LEFT SIDEBAR */}
                <aside className="hidden lg:block lg:col-span-3 h-full">
                  <div className="h-full overflow-y-auto scrollbar-hide">
                    <SidebarLeft />
                  </div>
                </aside>

                {/* CENTER */}
                <main className={`col-span-12 lg:col-span-9 xl:col-span-6 h-full ${location.pathname.includes("quick-chat") ? "overflow-hidden" : "overflow-y-auto"} scrollbar-hide`}>
                  <Outlet />
                </main>
                
                {/* RIGHT SIDEBAR */}
                <aside className="hidden xl:block xl:col-span-3 h-full">
                  <div className="h-full overflow-y-auto scrollbar-hide">
                    <SidebarRight />
                  </div>
                </aside>

              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MOBILE DRAWER */}
      <div className="drawer-side lg:hidden z-50">
        <label
          htmlFor="mobile-drawer"
          className="drawer-overlay mt-[calc(3.5rem+env(safe-area-inset-top,0px))] h-[calc(100vh-(3.5rem+env(safe-area-inset-top,0px)))]"
        />

        <div className="mt-[calc(3.5rem+env(safe-area-inset-top,0px))] h-[calc(100vh-(3.5rem+env(safe-area-inset-top,0px)))] w-72 bg-base-200 p-4 flex flex-col">
          {/* Drawer Header */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold opacity-70">Menu</span>
            <label htmlFor="mobile-drawer" className="btn btn-ghost btn-sm">
              ✕
            </label>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar scrollbar-hide">
            <SidebarLeft />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
