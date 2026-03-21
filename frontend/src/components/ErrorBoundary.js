import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error?.message || 'Unknown error' };
  }

  componentDidCatch(error, errorInfo) {
    // Keep details in console for debugging.
    // eslint-disable-next-line no-console
    console.error('Runtime UI error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif' }}>
          <h2>Application Error</h2>
          <p>The UI crashed while rendering. Please share this message:</p>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: '12px' }}>{this.state.errorMessage}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
