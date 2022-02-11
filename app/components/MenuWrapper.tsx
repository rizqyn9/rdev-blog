import { Children, createContext, ReactNode, useContext } from 'react'

const initial = {
  active: 0,
}

const MenuContext = createContext(initial)

const Provider = ({ children }: { children: ReactNode }) => {
  const Menu = useContext<typeof initial>(MenuContext)
  return <MenuContext.Provider value={Menu}>{children}</MenuContext.Provider>
}
