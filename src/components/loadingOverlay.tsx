import React from 'react';

// Styles object using inline styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',  // Make sure the overlay is positioned relative to this container
    display: 'inline-block',  // Keep the content inline (optional, depending on layout)
  },
  overlay: {
    position: 'absolute',  // Position the overlay inside the container
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    zIndex: 1000, // Ensure it's on top of the content
  },
  loadingText: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
  },
};

interface LoadingOverlayProps {
  loading: boolean;
  children: React.ReactNode;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading, children }) => {
  return (
    <div style={styles.container}>
      {loading && (
        <div style={styles.overlay}>
          <div style={styles.loadingText}>Loading...</div>
        </div>
      )}
      {children}
    </div>
  );
};

export default LoadingOverlay;
