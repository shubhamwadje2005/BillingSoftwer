import React, { lazy, memo, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const withLazy = (importFn) => {
    const LazyComponent = lazy(importFn)
    const ErrorHandler = ({ error, resetErrorBoundary }) => <>
        <p className="mb-3 small">{error.message}</p>
        <button onClick={resetErrorBoundary} className="btn btn-outline-danger btn-sm">Try Again</button>
    </>
    const WrappedComponent = () => (
        <ErrorBoundary FallbackComponent={ErrorHandler}>
            <Suspense fallback={<h1>Please wait ...</h1>}>
                <LazyComponent />
            </Suspense>
        </ErrorBoundary>
    )

    return memo(WrappedComponent)
}
