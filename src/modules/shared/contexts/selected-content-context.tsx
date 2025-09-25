import type { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import { PropsWithChildren, createContext, useContext, useState } from "react"

type SelectedContentContextType = {
  selectedItem: CategoryContentItem | undefined
  setSelectedContent: (item: CategoryContentItem) => void
  clearSelectedContent: () => void
}

const SelectedContentContext = createContext({} as SelectedContentContextType)

export function SelectedContentProvider({ children }: PropsWithChildren) {
  const [selectedItem, setSelectedItem] = useState<CategoryContentItem>()

  const setSelectedContent = (item: CategoryContentItem) =>
    setSelectedItem(item)

  const clearSelectedContent = () => setSelectedItem(undefined)

  return (
    <SelectedContentContext.Provider
      value={{
        selectedItem,
        setSelectedContent,
        clearSelectedContent,
      }}
    >
      {children}
    </SelectedContentContext.Provider>
  )
}

export function useSelectedContent() {
  return useContext(SelectedContentContext)
}
