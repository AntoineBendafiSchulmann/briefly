import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LoaderIcon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export function SpinnerCustom() {
  return (
    <div className="flex items-center gap-4">
      <Spinner />
    </div>
  )
}

export function SpinnerEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <LoaderIcon className="size-8 animate-spin" aria-label="Loading" />
      <h2 className="text-lg font-semibold">Chargement des données</h2>
      <p className="text-sm text-gray-500">
        Veuillez patienter pendant le chargement des données. Ne rafraîchissez pas la page.
      </p>
      <Button variant="outline" size="sm">
        Annuler
      </Button>
    </div>
  )
}
