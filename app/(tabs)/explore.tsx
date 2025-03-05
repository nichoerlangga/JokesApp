import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { HelloWave } from '@/components/HelloWave';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image 
          source={require("@/assets/images/FOTO_FORMAL.jpg")} 
          style={styles.headerImage} 
          resizeMode="center" 
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Halooo, My name is Nicholas <HelloWave></HelloWave></ThemedText>
      </ThemedView>
      <ThemedText style={{ textAlign: 'justify', lineHeight: 22 }}>
  Fresh graduate in Informatics from Telkom University with a solid foundation in software development, 
  mobile applications, and computer science. Proficient in Flutter, Kotlin, JavaScript, and Golang, 
  with hands-on experience gained through internships and training programs such as Bangkit Academy. 
  Passionate about problem-solving, teamwork, and continuous learning, eager to contribute and grow in the tech industry.
</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    position: 'absolute',
    width: "100%",
    height: 300,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
