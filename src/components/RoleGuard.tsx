import React from 'react';
import { Lock } from 'lucide-react';

export type UserRole = 'deviant' | 'architect' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  joinedDate: string;
}

interface RoleGuardProps {
  userRole: UserRole;
  requiredRole: UserRole;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RoleGuard = ({ userRole, requiredRole, children, fallback }: RoleGuardProps) => {
  const roles = ['deviant', 'architect', 'admin'];
  const userLevel = roles.indexOf(userRole);
  const requiredLevel = roles.indexOf(requiredRole);

  if (userLevel >= requiredLevel) {
    return <>{children}</>;
  }

  return fallback ? <>{fallback}</> : (
    <div className="p-8 border border-zinc-800 rounded-[2rem] bg-zinc-900/40 text-center flex flex-col items-center justify-center min-h-[300px]">
      <div className="aspect-square bg-black rounded-2xl mb-6 flex items-center justify-center p-6 border border-zinc-800 pointer-events-none">
        <Lock className="text-zinc-700" size={32} />
      </div>
      <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
        Clearance Required: <span className="text-[#FF69B4]">{requiredRole}</span>
      </p>
    </div>
  );
};

export const ArchitectBadge = () => (
  <span className="bg-[#FF1E89] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-sm tracking-tighter shadow-[0_0_10px_rgba(255,30,137,0.5)] border border-[#FF69B4]/50">
    Architect Tier
  </span>
);
