// User role types
export type UserRole = 'jugador' | 'arbitro' | 'delegado' | 'espectador' | 'admin';

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
  // Role-specific data
  playerData?: PlayerData;
  refereeData?: RefereeData;
  spectatorData?: SpectatorData;
}

// Role-specific data interfaces
export interface PlayerData {
  teamId?: string;
  position: string;
  jerseyNumber?: number;
  stats: {
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    matchesPlayed: number;
  };
}

export interface RefereeData {
  licenseNumber: string;
  experience: number; // years
  matchesRefereed: number;
  rating: number;
}

export interface SpectatorData {
  favoriteTeam?: string;
  preferences: {
    notifications: boolean;
    newsletter: boolean;
  };
}

// Role permissions
export interface RolePermissions {
  canViewMatches: boolean;
  canEditMatches: boolean;
  canManageTeams: boolean;
  canManagePlayers: boolean;
  canViewStats: boolean;
  canReceiveNotifications: boolean;
  canCommentMatches: boolean;
  canReportIncidents: boolean;
  canManageLeagues: boolean;
}

// Role configuration
export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  jugador: {
    canViewMatches: true,
    canEditMatches: false,
    canManageTeams: false,
    canManagePlayers: false,
    canViewStats: true,
    canReceiveNotifications: true,
    canCommentMatches: true,
    canReportIncidents: false,
    canManageLeagues: false,
  },
  arbitro: {
    canViewMatches: true,
    canEditMatches: true,
    canManageTeams: false,
    canManagePlayers: false,
    canViewStats: true,
    canReceiveNotifications: true,
    canCommentMatches: true,
    canReportIncidents: true,
    canManageLeagues: false,
  },
  delegado: {
    canViewMatches: true,
    canEditMatches: true,
    canManageTeams: true,
    canManagePlayers: true,
    canViewStats: true,
    canReceiveNotifications: true,
    canCommentMatches: true,
    canReportIncidents: true,
    canManageLeagues: false,
  },
  espectador: {
    canViewMatches: true,
    canEditMatches: false,
    canManageTeams: false,
    canManagePlayers: false,
    canViewStats: true,
    canReceiveNotifications: true,
    canCommentMatches: true,
    canReportIncidents: false,
    canManageLeagues: false,
  },
  admin: {
    canViewMatches: true,
    canEditMatches: true,
    canManageTeams: true,
    canManagePlayers: true,
    canViewStats: true,
    canReceiveNotifications: true,
    canCommentMatches: true,
    canReportIncidents: true,
    canManageLeagues: true,
  },
};

// Role display names
export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  jugador: 'Jugador',
  arbitro: 'Árbitro',
  delegado: 'Delegado del Campo',
  espectador: 'Espectador',
  admin: 'Administrador',
};

// Role icons
export const ROLE_ICONS: Record<UserRole, string> = {
  jugador: '👤',
  arbitro: '⚽',
  delegado: '🏟️',
  espectador: '👁️',
  admin: '👑',
};
