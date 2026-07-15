import React from 'react';

interface GlassCardProps {
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  loading = false,
  hover = true,
  onClick
}) => {
  const baseClass = 'glass-panel rounded-2xl p-6 transition-all duration-300';
  const hoverClass = hover ? 'glass-card-hover cursor-pointer' : '';
  const clickClass = onClick ? 'active:scale-[0.98]' : '';

  if (loading) {
    return (
      <div className={`${baseClass} min-h-[150px] flex flex-col justify-between space-y-4 ${className}`}>
        <div className="h-4 w-1/3 skeleton rounded" />
        <div className="h-8 w-2/3 skeleton rounded" />
        <div className="h-4 w-full skeleton rounded" />
      </div>
    );
  }

  return (
    <div 
      className={`${baseClass} ${hoverClass} ${clickClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
export default GlassCard;
