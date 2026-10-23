import React from 'react';
import Hero from './Hero';
import MenuGrid from './MenuGrid';

export default function Main({
  items = [],
  filteredItems = [],
  categories = [],
  loading = false,
  handleOpenCustomizer,
  onResetFilters
}) {
  return (
    <>
      {/* Hero Showcase Section */}
      <Hero
        items={items}
        handleOpenCustomizer={handleOpenCustomizer}
      />

      {/* Main Menu Grid Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <MenuGrid
          loading={loading}
          items={filteredItems}
          categories={categories}
          onCustomize={handleOpenCustomizer}
          onResetFilters={onResetFilters}
        />
      </main>
    </>
  );
}
