import JourneyTimeline from '../components/JourneyTimeline';

export default function JourneyPage() {
  return (
    <div style={styles.container}>
      <JourneyTimeline />
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    position: 'relative' as const,
    zIndex: 10,
  },
};
