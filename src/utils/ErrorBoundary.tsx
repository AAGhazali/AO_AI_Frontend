import { Card, CardContent } from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";
import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    console.error("Erreur capturée dans ErrorBoundary:", _);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Erreur capturée dans ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Card className="mt-6 border-red-500 bg-red-50 dark:bg-red-900/20">
            <CardContent className="flex items-start space-x-4 p-6">
              <div>
                <div className="top flex items-center">
                  <TriangleAlert className="text-red-500 mr-2" />
                  <div className="font-medium mb-1">
                    Erreur lors du rendu du rapport.
                  </div>
                </div>

                <p className="text-sm">
                  Il se peut que ce rapport contienne des données ou une
                  structure différente de celles que l'IA a l'habitude de
                  traiter. Cela peut provoquer des erreurs lors de l'affichage.
                </p>
              </div>
            </CardContent>
          </Card>
        )
      );
    }

    return this.props.children;
  }
}
