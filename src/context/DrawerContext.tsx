import { OverridableComponent } from "@mui/material/OverridableComponent"
import { createContext, useCallback, useContext, useState } from "react"

interface IDrawerOption {
  id: number;
  icon: OverridableComponent<any>;
  path: string;
  label: string;
  disabled: boolean;
}

interface IDrawerContextData {
  isDrawerOpen: boolean
  toggleDrawerOpen: () => void
  drawerOptions: IDrawerOption[]
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void
}

const DrawerContext = createContext({} as IDrawerContextData)

export const useDrawerContext = () => {
  return useContext(DrawerContext)
}
//@ts-ignore
export const DrawerProvider: React.FC = ({ children }) => {
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen)
  }, [])

  const handleSetDrawerOptions = useCallback(
    (newDrawerOptions: IDrawerOption[]) => {
      setDrawerOptions(newDrawerOptions)
    },
    [],
  )

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        drawerOptions,
        toggleDrawerOpen,
        setDrawerOptions: handleSetDrawerOptions,
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

export function useDrawer(){
  const context = useContext(DrawerContext);

  return context;
}