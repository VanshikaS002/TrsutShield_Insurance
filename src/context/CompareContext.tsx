import React, { createContext, useContext, useState, useEffect } from 'react';
import { Policy } from '../types';

interface CompareContextType {
  selectedPolicies: Policy[];
  addToCompare: (policy: Policy) => void;
  removeFromCompare: (policyName: string) => void;
  clearCompare: () => void;
  isPolicySelected: (policyName: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPolicies, setSelectedPolicies] = useState<Policy[]>([]);

  const addToCompare = (policy: Policy) => {
    if (selectedPolicies.length >= 4) {
      alert("You can only compare up to 4 policies at a time.");
      return;
    }
    
    // Encouraging same type comparison
    if (selectedPolicies.length > 0 && selectedPolicies[0].category !== policy.category) {
      if (!confirm(`You are comparing policies from different categories (${selectedPolicies[0].category} vs ${policy.category}). Do you want to continue?`)) {
        return;
      }
    }

    if (!selectedPolicies.some(p => p.name === policy.name)) {
      setSelectedPolicies([...selectedPolicies, policy]);
    }
  };

  const removeFromCompare = (policyName: string) => {
    setSelectedPolicies(selectedPolicies.filter(p => p.name !== policyName));
  };

  const clearCompare = () => {
    setSelectedPolicies([]);
  };

  const isPolicySelected = (policyName: string) => {
    return selectedPolicies.some(p => p.name === policyName);
  };

  return (
    <CompareContext.Provider value={{ selectedPolicies, addToCompare, removeFromCompare, clearCompare, isPolicySelected }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
