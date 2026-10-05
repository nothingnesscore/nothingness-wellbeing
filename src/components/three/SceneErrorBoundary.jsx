import React from 'react';

/**
 * Minimal error boundary so an optional enhancement (the WebGL hero scene) can
 * never take down the page. Renders `fallback` instead of unmounting the tree.
 */
export class SceneErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.error('[Nothingness] 3D scene failed to render, falling back to CSS only.', error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

export default SceneErrorBoundary;