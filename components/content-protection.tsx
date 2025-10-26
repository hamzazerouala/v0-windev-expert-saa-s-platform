"use client"

import type React from "react"

import { useEffect } from "react"

interface ContentProtectionProps {
  children: React.ReactNode
  enableRightClickProtection?: boolean
  enableDragProtection?: boolean
  enableCopyProtection?: boolean
  enableDevToolsProtection?: boolean
}

export function ContentProtection({
  children,
  enableRightClickProtection = true,
  enableDragProtection = true,
  enableCopyProtection = true,
  enableDevToolsProtection = false,
}: ContentProtectionProps) {
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      if (enableRightClickProtection) {
        e.preventDefault()
        return false
      }
    }

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      if (enableDragProtection) {
        e.preventDefault()
        return false
      }
    }

    // Disable copy/cut
    const handleCopy = (e: ClipboardEvent) => {
      if (enableCopyProtection) {
        e.preventDefault()
        return false
      }
    }

    // Disable keyboard shortcuts for dev tools and save
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        enableDevToolsProtection &&
        (e.key === "F12" ||
          (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
          (e.ctrlKey && e.key === "U"))
      ) {
        e.preventDefault()
        return false
      }

      // Disable Ctrl+S (save)
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault()
        return false
      }
    }

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      if (enableCopyProtection) {
        e.preventDefault()
        return false
      }
    }

    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("dragstart", handleDragStart)
    document.addEventListener("copy", handleCopy)
    document.addEventListener("cut", handleCopy)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("selectstart", handleSelectStart)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("dragstart", handleDragStart)
      document.removeEventListener("copy", handleCopy)
      document.removeEventListener("cut", handleCopy)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("selectstart", handleSelectStart)
    }
  }, [enableRightClickProtection, enableDragProtection, enableCopyProtection, enableDevToolsProtection])

  return <div className="select-none">{children}</div>
}
