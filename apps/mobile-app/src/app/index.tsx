import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

const PILLARS = [
  {
    title: 'Care without borders',
    description: 'Connecting people and communities with the support they need, wherever they are.',
  },
  {
    title: 'Trusted partners',
    description: 'Working alongside local organizations and volunteers to deliver lasting impact.',
  },
  {
    title: 'Transparent impact',
    description: 'Clear, accountable reporting so every contribution makes a visible difference.',
  },
];

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <ThemedView type="backgroundSelected" style={styles.logoMark}>
            <ThemedText style={styles.logoText}>HC</ThemedText>
          </ThemedView>
          <ThemedText type="small" themeColor="textSecondary" style={styles.eyebrow}>
            Welcome to
          </ThemedText>
          <ThemedText type="subtitle" style={styles.title}>
            HumanCare Worldwide
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.tagline}>
            Compassion, connection and care for people everywhere.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.pillars}>
          {PILLARS.map((pillar) => (
            <ThemedView key={pillar.title} type="backgroundElement" style={styles.card}>
              <ThemedText type="smallBold">{pillar.title}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {pillar.description}
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },
  logoMark: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 34,
  },
  eyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    textAlign: 'center',
  },
  tagline: {
    textAlign: 'center',
    marginTop: Spacing.one,
  },
  pillars: {
    alignSelf: 'stretch',
    gap: Spacing.two,
  },
  card: {
    gap: Spacing.one,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
});
