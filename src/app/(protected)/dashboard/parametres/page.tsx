import { Button } from '@/components/ui/button';

export default function ParametresPage() {
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
          <select id="theme" name="theme" className="w-full p-2 border rounded">
            <option value="light">Clair</option>
            <option value="dark">Sombre</option>
          </select>
        </div>
        <Button type="submit" variant="default" size="lg" className="w-full">
          Sauvegarder
        </Button>
      </form>
    </div>
  );
}