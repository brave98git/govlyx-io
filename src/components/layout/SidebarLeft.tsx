import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Dices,
  User,
  Settings,
  LayoutDashboard,
  Bell,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useCurrentUser } from "../../hooks/useUser";
import { useUnreadNotificationsCount } from "../../hooks/useNotification";

const BASE_NAV_ITEMS = [
  { label: "Home", icon: Home, to: "/" },
  { label: "Communities", icon: Users, to: "/communities" },
  { label: "Notifications", icon: Bell, to: "/notifications" },
  { label: "Quick Chat", icon: Dices, to: "/quick-chat" },
  { label: "Profile", icon: User, to: "/profile" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

const DEPT_NAV_ITEM = { label: "Dept. Dashboard", icon: LayoutDashboard, to: "/department/dashboard" };

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const SidebarLeft = () => {
  const { data: user, isLoading: loading } = useCurrentUser();
  const { data: unreadCount } = useUnreadNotificationsCount();
  const { theme, toggleTheme } = useTheme();

  // Simple check for role since useCurrentUser returns the full profile
  const isDept = user?.role === "ROLE_DEPARTMENT";
  const username = user?.actualUsername ?? user?.username;

  const navItems = isDept
    ? [...BASE_NAV_ITEMS.slice(0, 3), DEPT_NAV_ITEM, ...BASE_NAV_ITEMS.slice(3)]
    : BASE_NAV_ITEMS;

  // Removing unused avatarLetter
  const displayName = loading ? "Loading..." : (username ?? "Anonymous User");

  return (
    <aside className="flex min-h-full flex-col gap-6 pb-8">

      {/* Profile Card */}
      <div className="rounded-xl bg-base-200 p-4">
        <div className="flex items-center gap-3">
          <div className="avatar placeholder">
            <div className="w-10 rounded-full overflow-hidden bg-base-200 border border-base-300">
              <img src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${encodeURIComponent(displayName)}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate" title={displayName}>{displayName}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="rounded-xl bg-base-200 p-2">
        {navItems.map(({ label, icon: Icon, to }) => {
          const isNotifications = label === "Notifications";

          return (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition relative
                ${isActive
                  ? "bg-[#1D4ED8] text-white"
                  : "hover:bg-base-300"
                }`
              }
            >
              <Icon size={18} />
              <span className="flex-1">{label}</span>
              {isNotifications && unreadCount !== undefined && unreadCount > 0 && (
                <span className="bg-error text-error-content text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Mobile Theme Toggle */}
      <div className="lg:hidden mt-auto pt-4">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl bg-base-300/30 hover:bg-base-300 transition-colors duration-200"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-base-100 shadow-sm">
            {theme === "light" ? <Moon size={18} className="text-blue-600" /> : <Sun size={18} className="text-yellow-500" />}
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-bold truncate">{theme === "light" ? "Dark Mode" : "Light Mode"}</p>
            <p className="text-[10px] opacity-40 uppercase font-bold tracking-wider truncate">Switch Theme</p>
          </div>
          <div className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${theme === "dark" ? "bg-blue-600" : "bg-base-content/20"}`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform duration-300 ${theme === "dark" ? "translate-x-4.5" : "translate-x-0.5"}`} />
          </div>
        </button>
      </div>

      {/* Communities Placeholder */}
      <div className="rounded-xl bg-base-200 p-4">
        <p className="mb-2 text-sm font-semibold opacity-70">
          Your Communities
        </p>
        <ul className="space-y-2 text-sm opacity-80">
          <li className="truncate">Delhi NCR</li>
          <li className="truncate">Tech Support</li>
          <li className="truncate">Education India</li>
          <li className="truncate">Baramati News</li>
        </ul>
      </div>

    </aside>
  );
};

export default SidebarLeft;
