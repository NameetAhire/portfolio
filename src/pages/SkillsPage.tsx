import Skills from '../components/Skills';

export default function SkillsPage() {
  return (
    <div style={styles.container}>
      <Skills />
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
