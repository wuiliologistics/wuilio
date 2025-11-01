"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface CompanyContextType {
  selectedCompany: string
  selectedCompanyName: string
  changeCompany: (companyId: string, companyName: string) => void
  registerFormDirty: (isDirty: boolean) => void
  saveDraft: () => void
  requestNavigation: (href: string) => boolean
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined)

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [selectedCompany, setSelectedCompany] = useState("wuilio-peru")
  const [selectedCompanyName, setSelectedCompanyName] = useState("WUILIO PERU S.A.C.")
  const [isFormDirty, setIsFormDirty] = useState(false)
  const [pendingCompanyChange, setPendingCompanyChange] = useState<{
    id: string
    name: string
  } | null>(null)
  const [showWarningDialog, setShowWarningDialog] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname.includes("/ordenes/nueva")) return

    const handlePopState = (e: PopStateEvent) => {
      console.log("[v0] Popstate detected, form dirty:", isFormDirty)
      if (isFormDirty) {
        e.preventDefault()
        // Push state back to stay on current page
        window.history.pushState(null, "", pathname)
        setPendingNavigation("/ordenes")
        setShowWarningDialog(true)
      }
    }

    // Push initial state to enable popstate detection
    window.history.pushState(null, "", pathname)
    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [pathname, isFormDirty])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (pathname.includes("/ordenes/nueva") && isFormDirty) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [pathname, isFormDirty])

  const requestNavigation = useCallback(
    (href: string) => {
      console.log("[v0] Navigation requested to:", href, "Form dirty:", isFormDirty, "Current path:", pathname)

      // Allow navigation if not on Nueva Orden page
      if (!pathname.includes("/ordenes/nueva")) {
        return true
      }

      // Allow navigation if form is clean
      if (!isFormDirty) {
        return true
      }

      // Allow navigation if trying to go to the same page
      if (href === pathname) {
        return true
      }

      // Block navigation and show dialog
      console.log("[v0] Blocking navigation, showing dialog")
      setPendingNavigation(href)
      setShowWarningDialog(true)
      return false
    },
    [pathname, isFormDirty],
  )

  const changeCompany = (companyId: string, companyName: string) => {
    if (pathname.includes("/ordenes/nueva") && isFormDirty) {
      setPendingCompanyChange({ id: companyId, name: companyName })
      setShowWarningDialog(true)
    } else {
      setSelectedCompany(companyId)
      setSelectedCompanyName(companyName)
      setIsFormDirty(false)

      if (pathname.includes("/ordenes/nueva")) {
        router.push("/ordenes")
      }
    }
  }

  const registerFormDirty = (isDirty: boolean) => {
    setIsFormDirty(isDirty)
  }

  const saveDraft = () => {
    window.dispatchEvent(new CustomEvent("saveDraft"))
  }

  const handleContinue = () => {
    console.log("[v0] User confirmed navigation")
    saveDraft()

    setTimeout(() => {
      if (pendingCompanyChange) {
        setSelectedCompany(pendingCompanyChange.id)
        setSelectedCompanyName(pendingCompanyChange.name)
        setIsFormDirty(false)
        setShowWarningDialog(false)
        setPendingCompanyChange(null)
        router.push("/ordenes")
      } else if (pendingNavigation) {
        setIsFormDirty(false)
        setShowWarningDialog(false)
        const nav = pendingNavigation
        setPendingNavigation(null)
        router.push(nav)
      }
    }, 100)
  }

  const handleCancel = () => {
    console.log("[v0] User cancelled navigation")
    setShowWarningDialog(false)
    setPendingCompanyChange(null)
    setPendingNavigation(null)

    if (pathname.includes("/ordenes/nueva") && isFormDirty) {
      window.history.pushState(null, "", pathname)
    }
  }

  return (
    <CompanyContext.Provider
      value={{
        selectedCompany,
        selectedCompanyName,
        changeCompany,
        registerFormDirty,
        saveDraft,
        requestNavigation,
      }}
    >
      {children}

      <Dialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>¿Deseas salir del formulario?</DialogTitle>
            <DialogDescription>Los cambios que no hayas guardado se perderán.</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button onClick={handleContinue}>Continuar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CompanyContext.Provider>
  )
}

export function useCompany() {
  const context = useContext(CompanyContext)
  if (context === undefined) {
    throw new Error("useCompany must be used within a CompanyProvider")
  }
  return context
}
