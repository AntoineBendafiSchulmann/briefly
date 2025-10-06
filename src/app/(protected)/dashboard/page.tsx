import { Metadata } from 'next';
import RewriteForm from '@/components/rewrite-form';

export const metadata: Metadata = {
  title: 'Briefly — Dashboard',
};

export default function DashboardPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Reformuler un contenu</h1>
      <RewriteForm />
    </main>
  );
}
