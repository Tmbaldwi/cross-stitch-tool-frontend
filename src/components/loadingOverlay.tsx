import React from 'react';

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


// Styles object using inline styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    display: 'flex',
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(80, 80, 80, 0.5)', // Semi-transparent background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure it's on top of the content
  },
  loadingText: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
  },
};

export default LoadingOverlay;
