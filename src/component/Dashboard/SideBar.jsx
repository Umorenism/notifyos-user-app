// src/components/dashboard/SideBar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Send,
  Wallet,
  Receipt,
  Settings,
  LogOut,
  FileCode,
  KeyRound,
  X,
} from "lucide-react";
import logo from "../../assets/logoicon.svg";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    if (logout) await logout();
    navigate("/login");
  };

  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
      isActive
        ? "bg-[#DC2626] text-white shadow-md font-semibold"
        : "text-gray-300 hover:text-white hover:bg-[#0A385C]/50"
    }`;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#01156D] text-white flex flex-col h-full border-r border-[#0A385C] select-none transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 flex items-center justify-between border-b border-[#0A385C]/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-md">
              <img src={logo} alt="NotifyOs Logo" className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              NotifyOs
            </span>
          </div>
          {/* Close Button for Mobile */}
          <button
            onClick={onClose}
            className="lg:hidden text-gray-300 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          
          {/* PLATFORM */}
          <div>
            <p className="px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Platform
            </p>
            <nav className="space-y-1">
              <NavLink to="/dashboard" end onClick={onClose} className={navItemStyle}>
                <LayoutDashboard className="w-4 h-4" />
                Overview
              </NavLink>
              <NavLink to="/dashboard/messages" onClick={onClose} className={navItemStyle}>
                <MessageSquare className="w-4 h-4" />
                Messages
              </NavLink>
            </nav>
          </div>

          {/* CONFIGURE */}
          <div>
            <p className="px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Configure
            </p>
            <nav className="space-y-1">
              <NavLink to="/dashboard/sender-ids" onClick={onClose} className={navItemStyle}>
                <Send className="w-4 h-4" />
                Sender IDs
              </NavLink>
              <NavLink to="/dashboard/templetes" onClick={onClose} className={navItemStyle}>
                <FileCode className="w-4 h-4" />
                Templates & Webhooks
              </NavLink>
              <NavLink to="/dashboard/api-keys" onClick={onClose} className={navItemStyle}>
                <KeyRound className="w-4 h-4" />
                API Keys
              </NavLink>
            </nav>
          </div>

          {/* ACCOUNT */}
          <div>
            <p className="px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Account
            </p>
            <nav className="space-y-1">
              <NavLink to="/dashboard/wallet" onClick={onClose} className={navItemStyle}>
                <Wallet className="w-4 h-4" />
                Wallet
              </NavLink>
              <NavLink to="/dashboard/billing" onClick={onClose} className={navItemStyle}>
                <Receipt className="w-4 h-4" />
                Billing
              </NavLink>
              <NavLink to="/dashboard/settings" onClick={onClose} className={navItemStyle}>
                <Settings className="w-4 h-4" />
                Org Settings
              </NavLink>
            </nav>
          </div>

        </div>

        {/* Log Out Action Footer */}
        <div className="p-4 border-t border-[#0A385C]/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-red-500/10 transition-all duration-150"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}