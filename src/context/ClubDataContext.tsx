import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Category,
  ClubInfo,
  Match,
  MembershipApplication,
  MembershipPlan,
  NewsArticle,
  Player
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_CLUB_INFO,
  INITIAL_MATCHES,
  INITIAL_MEMBERSHIP_PLANS,
  INITIAL_NEWS
} from '../data/initialData';

interface ClubDataContextType {
  clubInfo: ClubInfo;
  categories: Category[];
  matches: Match[];
  news: NewsArticle[];
  membershipPlans: MembershipPlan[];
  membershipApplications: MembershipApplication[];
  
  // Public actions
  submitMembershipApplication: (app: Omit<MembershipApplication, 'id' | 'submittedAt' | 'status'>) => void;

  // Admin match management
  addMatch: (match: Omit<Match, 'id'>) => void;
  updateMatch: (id: string, match: Partial<Match>) => void;
  deleteMatch: (id: string) => void;

  // Admin news management
  addNews: (newsItem: Omit<NewsArticle, 'id'>) => void;
  updateNews: (id: string, newsItem: Partial<NewsArticle>) => void;
  deleteNews: (id: string) => void;

  // Admin category & player management
  updateCategory: (id: string, updated: Partial<Category>) => void;
  addPlayerToCategory: (categoryId: string, player: Omit<Player, 'id'>) => void;
  updatePlayer: (categoryId: string, playerId: string, player: Partial<Player>) => void;
  deletePlayer: (categoryId: string, playerId: string) => void;

  // Admin club info & contact
  updateClubInfo: (info: Partial<ClubInfo>) => void;

  // Admin applications
  updateApplicationStatus: (id: string, status: MembershipApplication['status']) => void;
  deleteApplication: (id: string) => void;

  // Admin auth & reset
  isAdminLoggedIn: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  resetToDefaults: () => void;
}

const ClubDataContext = createContext<ClubDataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CLUB_INFO: 'meridiano_club_info_v1',
  CATEGORIES: 'meridiano_categories_v1',
  MATCHES: 'meridiano_matches_v1',
  NEWS: 'meridiano_news_v1',
  PLANS: 'meridiano_plans_v1',
  APPLICATIONS: 'meridiano_applications_v1',
  ADMIN_SESSION: 'meridiano_admin_session_v1',
  ADMIN_PIN: 'meridiano_admin_pin_v1'
};

const DEFAULT_PIN = '1929'; // Default club founding year PIN! Simple and memorable for administrators.

export const ClubDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clubInfo, setClubInfo] = useState<ClubInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CLUB_INFO);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved club info', e);
      }
    }
    return INITIAL_CLUB_INFO;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved categories', e);
      }
    }
    return INITIAL_CATEGORIES;
  });

  const [matches, setMatches] = useState<Match[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MATCHES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved matches', e);
      }
    }
    return INITIAL_MATCHES;
  });

  const [news, setNews] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NEWS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved news', e);
      }
    }
    return INITIAL_NEWS;
  });

  const [membershipPlans] = useState<MembershipPlan[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PLANS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved plans', e);
      }
    }
    return INITIAL_MEMBERSHIP_PLANS;
  });

  const [membershipApplications, setMembershipApplications] = useState<MembershipApplication[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing applications', e);
      }
    }
    return [
      {
        id: 'app-sample-1',
        fullName: 'Martina Gomez',
        dni: '44.892.114',
        birthDate: '2004-03-12',
        phone: '221-543-9821',
        email: 'marti.gomez@gmail.com',
        planId: 'socio-deportivo',
        interestActivity: 'Básquet Femenino',
        message: 'Juego de base o escolta, me gustaría comenzar la próxima semana.',
        submittedAt: 'Hace 2 días',
        status: 'pendiente'
      },
      {
        id: 'app-sample-2',
        fullName: 'Julián Rossi',
        dni: '52.124.908',
        birthDate: '2016-08-25',
        phone: '221-419-7700',
        email: 'rossi.fam@gmail.com',
        planId: 'socio-menor',
        interestActivity: 'Mini Básquet',
        message: 'Inscripción para mi hijo en categoría premini.',
        submittedAt: 'Hace 4 días',
        status: 'contactado'
      }
    ];
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLUB_INFO, JSON.stringify(clubInfo));
  }, [clubInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(membershipApplications));
  }, [membershipApplications]);

  // Auth functions
  const loginAdmin = (pin: string): boolean => {
    const cleanPin = pin.trim();
    if (cleanPin === DEFAULT_PIN || cleanPin === 'meridiano1929' || cleanPin === '1929') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  };

  // Membership Application Submission
  const submitMembershipApplication = (app: Omit<MembershipApplication, 'id' | 'submittedAt' | 'status'>) => {
    const newApp: MembershipApplication = {
      ...app,
      id: 'app-' + Date.now(),
      submittedAt: new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      status: 'pendiente'
    };
    setMembershipApplications(prev => [newApp, ...prev]);
  };

  const updateApplicationStatus = (id: string, status: MembershipApplication['status']) => {
    setMembershipApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status } : app))
    );
  };

  const deleteApplication = (id: string) => {
    setMembershipApplications(prev => prev.filter(app => app.id !== id));
  };

  // Matches
  const addMatch = (matchData: Omit<Match, 'id'>) => {
    const newMatch: Match = {
      ...matchData,
      id: 'match-' + Date.now()
    };
    setMatches(prev => [newMatch, ...prev]);
  };

  const updateMatch = (id: string, updated: Partial<Match>) => {
    setMatches(prev =>
      prev.map(m => (m.id === id ? { ...m, ...updated } : m))
    );
  };

  const deleteMatch = (id: string) => {
    setMatches(prev => prev.filter(m => m.id !== id));
  };

  // News
  const addNews = (newsData: Omit<NewsArticle, 'id'>) => {
    const newArticle: NewsArticle = {
      ...newsData,
      id: 'news-' + Date.now()
    };
    setNews(prev => [newArticle, ...prev]);
  };

  const updateNews = (id: string, updated: Partial<NewsArticle>) => {
    setNews(prev =>
      prev.map(n => (n.id === id ? { ...n, ...updated } : n))
    );
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  // Categories & Players
  const updateCategory = (id: string, updated: Partial<Category>) => {
    setCategories(prev =>
      prev.map(cat => (cat.id === id ? { ...cat, ...updated } : cat))
    );
  };

  const addPlayerToCategory = (categoryId: string, playerData: Omit<Player, 'id'>) => {
    const newPlayer: Player = {
      ...playerData,
      id: 'player-' + Date.now()
    };
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            players: [...cat.players, newPlayer]
          };
        }
        return cat;
      })
    );
  };

  const updatePlayer = (categoryId: string, playerId: string, playerUpdate: Partial<Player>) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            players: cat.players.map(p => (p.id === playerId ? { ...p, ...playerUpdate } : p))
          };
        }
        return cat;
      })
    );
  };

  const deletePlayer = (categoryId: string, playerId: string) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            players: cat.players.filter(p => p.id !== playerId)
          };
        }
        return cat;
      })
    );
  };

  // Club Info
  const updateClubInfo = (infoUpdate: Partial<ClubInfo>) => {
    setClubInfo(prev => ({ ...prev, ...infoUpdate }));
  };

  // Reset to original mock data
  const resetToDefaults = () => {
    setClubInfo(INITIAL_CLUB_INFO);
    setCategories(INITIAL_CATEGORIES);
    setMatches(INITIAL_MATCHES);
    setNews(INITIAL_NEWS);
    localStorage.removeItem(STORAGE_KEYS.CLUB_INFO);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.MATCHES);
    localStorage.removeItem(STORAGE_KEYS.NEWS);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
  };

  return (
    <ClubDataContext.Provider
      value={{
        clubInfo,
        categories,
        matches,
        news,
        membershipPlans,
        membershipApplications,
        submitMembershipApplication,
        addMatch,
        updateMatch,
        deleteMatch,
        addNews,
        updateNews,
        deleteNews,
        updateCategory,
        addPlayerToCategory,
        updatePlayer,
        deletePlayer,
        updateClubInfo,
        updateApplicationStatus,
        deleteApplication,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        resetToDefaults
      }}
    >
      {children}
    </ClubDataContext.Provider>
  );
};

export const useClubData = () => {
  const context = useContext(ClubDataContext);
  if (!context) {
    throw new Error('useClubData must be used within a ClubDataProvider');
  }
  return context;
};
