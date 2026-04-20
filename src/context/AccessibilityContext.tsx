import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessProps {
  focusMode: boolean; toggleFocus: () => void;
  reduceMotion: boolean; toggleMotion: () => void;
  dyslexicFont: boolean; toggleFont: () => void;
  highContrast: boolean; toggleContrast: () => void;
  colorBlindMode: boolean; toggleColorBlind: () => void;
  lightMode: boolean; toggleLightMode: () => void;
  isSimplifiedMode: boolean; toggleSimplifiedMode: () => void;
}

const AccessContext = createContext<AccessProps | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [focusMode, setFocusMode] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [isSimplifiedMode, setIsSimplifiedMode] = useState(() => {
    const saved = localStorage.getItem('deviant_simplified_mode');
    return saved === 'true';
  });

  const toggleSimplifiedMode = () => {
    setIsSimplifiedMode(prev => {
      const newVal = !prev;
      localStorage.setItem('deviant_simplified_mode', String(newVal));
      return newVal;
    });
  };

  // Apply classes to the body tag so styles ripple through the whole site
  useEffect(() => {
    const body = document.body;
    focusMode ? body.classList.add('focus-mode') : body.classList.remove('focus-mode');
    reduceMotion ? body.classList.add('reduce-motion') : body.classList.remove('reduce-motion');
    dyslexicFont ? body.classList.add('dyslexic-font') : body.classList.remove('dyslexic-font');
    highContrast ? body.classList.add('high-contrast') : body.classList.remove('high-contrast');
    colorBlindMode ? body.classList.add('color-blind-mode') : body.classList.remove('color-blind-mode');
    lightMode ? body.classList.add('light-mode') : body.classList.remove('light-mode');
    isSimplifiedMode ? body.classList.add('lite-mode') : body.classList.remove('lite-mode');
  }, [focusMode, reduceMotion, dyslexicFont, highContrast, colorBlindMode, lightMode, isSimplifiedMode]);

  return (
    <AccessContext.Provider value={{ 
      focusMode, toggleFocus: () => setFocusMode(!focusMode),
      reduceMotion, toggleMotion: () => setReduceMotion(!reduceMotion),
      dyslexicFont, toggleFont: () => setDyslexicFont(!dyslexicFont),
      highContrast, toggleContrast: () => setHighContrast(!highContrast),
      colorBlindMode, toggleColorBlind: () => setColorBlindMode(!colorBlindMode),
      lightMode, toggleLightMode: () => setLightMode(!lightMode),
      isSimplifiedMode, toggleSimplifiedMode
    }}>
      <div className={isSimplifiedMode ? 'simplified-mode lite-mode' : 'standard-mode'}>
        {children}
      </div>
    </AccessContext.Provider>
  );
};

export const useAccess = () => {
  const context = useContext(AccessContext);
  if (!context) throw new Error('useAccess must be used within AccessibilityProvider');
  return context;
};
