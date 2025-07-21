import React, { useEffect, useState } from 'react';

interface Breed {
  id: string;
  attributes: {
    name: string;
    description?: string;
  };
}

const DashboardPage: React.FC = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://dogapi.dog/api/v2/breeds')
      .then(res => res.json())
      .then(data => {
        setBreeds(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch breeds');
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="text-xl text-gray-700 animate-pulse">Loading...</div>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="text-xl text-red-500">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      {/* Header Bar */}
      <header className="bg-white/80 backdrop-blur sticky top-0 z-10 shadow-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">🐶 Dog Breeds Dashboard</h1>
          <span className="text-sm text-gray-500">Powered by dogapi.dog</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {breeds.map(breed => (
            <div key={breed.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:scale-105 transition-transform duration-200">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3 text-2xl">🐾</div>
                <div className="font-bold text-lg text-indigo-800">{breed.attributes.name}</div>
              </div>
              {breed.attributes.description ? (
                <div className="text-gray-600 text-sm mt-2 line-clamp-3">{breed.attributes.description}</div>
              ) : (
                <div className="text-gray-400 italic text-xs mt-2">No description available.</div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
