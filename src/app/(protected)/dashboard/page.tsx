'use client';

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Bienvenue sur Briefly</h1>
      <p className="text-lg mb-4">
         Simplifiez vos communications professionnelles grâce à notre outil de reformulation et de traitement de documents.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded shadow bg-gray-100 text-black">
          <h2 className="text-xl font-semibold">Reformulation et Traitement de Documents</h2>
          <p>Reformulez vos emails, traitez vos documents, messages Slack, et autres contenus en quelques clics</p>
        </div>
        <div className="p-4 rounded shadow bg-gray-100 text-black">
          <h2 className="text-xl font-semibold">Historique</h2>
          <p>Consultez vos reformulations précédentes et gagnez du temps.</p>
        </div>
        <div className="p-4 rounded shadow bg-gray-100 text-black">
          <h2 className="text-xl font-semibold">Statistiques</h2>
          <p>Analysez vos performances et le temps économisé grâce à Briefly.</p>
        </div>
        <div className="p-4 rounded shadow bg-gray-100 text-black">
          <h2 className="text-xl font-semibold">Paramètres</h2>
          <p>Personnalisez votre expérience et configurez vos préférences.</p>
        </div>
      </div>
    </div>
  );
}