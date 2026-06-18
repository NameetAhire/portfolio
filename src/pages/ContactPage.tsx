import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <div style={styles.container}>
      <Contact />
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
