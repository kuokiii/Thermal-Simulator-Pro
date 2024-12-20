"use client"

import { Component, ErrorInfo, ReactNode } from "react"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Visualization error:", error, errorInfo)
    this.setState({ errorInfo })
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Visualization Error</AlertTitle>
          <AlertDescription className="space-y-4">
            <p>There was an error loading the 3D visualization.</p>
            <p>Error: {this.state.error?.message}</p>
            {this.state.errorInfo && (
              <pre className="mt-2 w-full overflow-auto text-xs">
                <code>{this.state.errorInfo.componentStack}</code>
              </pre>
            )}
            <Button
              variant="outline"
              onClick={() => this.setState({ hasError: false, error: undefined, errorInfo: undefined })}
            >
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      )
    }

    return this.props.children
  }
}

