// // src/components/dashboard/Header.jsx
// import React from 'react';
// import { useAuth } from '../../context/AuthContext';

// export default function Header() {
//   const { user } = useAuth();
//   const userName = user?.name || 'Admin';
//   const userRole = (user?.role || 'Admin')
//     .replace(/_/g, ' ')
//     .replace(/\b\w/g, (letter) => letter.toUpperCase());
//   const userAvatar = user?.avatar || user?.profileImage || user?.profile_image;
//   const userInitials = userName
//     .split(/\s+/)
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((part) => part[0])
//     .join('')
//     .toUpperCase();

//   return (
//     <header className="flex justify-end items-center py-4 px-8 border-b border-slate-200/60 bg-[#f4f5f9]">
//       <div className="flex items-center gap-3">
//         {/* Avatar comes first */}
//         {userAvatar ? (
//           <img
//             src={userAvatar}
//             alt={userName}
//             className="w-10 h-10 rounded-full object-cover border border-slate-300"
//           />
//         ) : (
//           <div
//             aria-label={userName}
//             className="w-10 h-10 rounded-full border border-slate-300 bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-bold"
//           >
//             {userInitials}
//           </div>
//         )}
//         <div className="text-left">
//           <p className="text-sm font-bold text-[#141b4d]">{userName}</p>
//           <p className="text-[11px] text-slate-500">{userRole}</p>
//         </div>
//       </div>
//     </header>
//   );
// }







import React from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Header({ onMenuClick }) {
  const { user } = useAuth();
  const userName = user?.name || 'Admin';
  const userRole = (user?.role || 'Admin')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
  const userAvatar = user?.avatar || user?.profileImage || user?.profile_image;
  const userInitials = userName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <header className="flex justify-between lg:justify-end items-center py-4 px-4 sm:px-8 border-b border-slate-200/60 bg-[#f4f5f9]">
      {/* Mobile Menu Trigger */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-200/60 transition"
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex items-center gap-3">
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover border border-slate-300"
          />
        ) : (
          <div
            aria-label={userName}
            className="w-10 h-10 rounded-full border border-slate-300 bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-bold"
          >
            {userInitials}
          </div>
        )}
        <div className="text-left hidden sm:block">
          <p className="text-sm font-bold text-[#141b4d]">{userName}</p>
          <p className="text-[11px] text-slate-500">{userRole}</p>
        </div>
      </div>
    </header>
  );
}