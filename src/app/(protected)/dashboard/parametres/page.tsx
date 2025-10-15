'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ParametresPage() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Paramètres</h1>
      <p className="text-lg mb-4">
        Configurez vos préférences pour personnaliser votre expérience avec Briefly.
      </p>
      <form className="space-y-4">
        <div>
          <label htmlFor="theme" className="block text-sm font-medium">
            Thème
          </label>
          <Select onValueChange={handleThemeChange} value={theme}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionnez un thème" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Clair</SelectItem>
              <SelectItem value="dark">Sombre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="button" variant="default" size="lg" className="w-full">
          Sauvegarder
        </Button>
      </form>
    </div>
  );
}