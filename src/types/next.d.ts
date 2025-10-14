/* eslint-disable @typescript-eslint/no-explicit-any */

//patch temporaire pour Next.js 15+ :
//Next.js génère dans `.next/types/validator.ts` une instruction du type :
//const handler = {} as typeof import(".../page.js")
//ce `import()` échoue car typeScript ne peut pas résoudre le module .js (inexistant dans le projet).
//ce module permet de forcer `typeof import(...)` à être `any`, pour satisfaire la contrainte AppPageConfig<...>
//et faire passer le build
declare module "*.js" {
  const value: any;
  export = value;
}