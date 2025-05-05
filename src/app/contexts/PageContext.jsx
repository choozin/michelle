'use client';

import { createContext, useState } from 'react';

// 1. Create the context with a default shape
export const PageContext = createContext({
  currentPage: '',
  setCurrentPage: () => {},
});

// 2. Create and export a provider component
export default function PageProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
}