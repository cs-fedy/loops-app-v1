import type { CategoryContentItem } from "@/modules/shared/domain/entities/category-content-item"
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react"

type NavigationState = {
  isNavigating: boolean
  navigationDirection: "next" | "previous" | null
  previousItem: CategoryContentItem | null
}

type SelectedContentContextType = {
  selectedItem: CategoryContentItem | undefined
  navigationState: NavigationState
  setSelectedContent: (item: CategoryContentItem) => void
  clearSelectedContent: () => void
  setNavigationState: (state: Partial<NavigationState>) => void
  resetNavigationState: () => void
  navigateToItem: (params: {
    item: CategoryContentItem
    direction: "next" | "previous"
  }) => void
}

const SelectedContentContext = createContext({} as SelectedContentContextType)

const initialNavigationState: NavigationState = {
  isNavigating: false,
  navigationDirection: null,
  previousItem: null,
}

export function SelectedContentProvider({ children }: PropsWithChildren) {
  const [selectedItem, setSelectedItem] = useState<CategoryContentItem>()
  const [navigationState, setNavigationStateInternal] =
    useState<NavigationState>(initialNavigationState)

  const setSelectedContent = (item: CategoryContentItem) =>
    setSelectedItem(item)

  const clearSelectedContent = () => {
    setNavigationStateInternal(initialNavigationState)
    setSelectedItem(undefined)
  }

  const setNavigationState = (state: Partial<NavigationState>) =>
    setNavigationStateInternal((prev) => ({ ...prev, ...state }))

  const resetNavigationState = useCallback(() => {
    setNavigationStateInternal(initialNavigationState)
  }, [])

  const navigateToItem = (params: {
    item: CategoryContentItem
    direction: "next" | "previous"
  }) => {
    setNavigationStateInternal({
      isNavigating: true,
      navigationDirection: params.direction,
      previousItem: selectedItem || null,
    })
    setSelectedItem(params.item)
  }

  return (
    <SelectedContentContext.Provider
      value={{
        selectedItem,
        navigationState,
        setSelectedContent,
        clearSelectedContent,
        setNavigationState,
        resetNavigationState,
        navigateToItem,
      }}
    >
      {children}
    </SelectedContentContext.Provider>
  )
}

export function useSelectedContent() {
  return useContext(SelectedContentContext)
}
