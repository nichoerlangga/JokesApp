import React, { useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  StyleSheet 
} from "react-native";
import Collapsible from "react-native-collapsible";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

interface JokeCategory {
  id: number;
  name: string;
  jokes: string[];
  jokeLimit: number;
}

interface JokeCategoryCardProps {
  item: JokeCategory;
  index: number;
  collapsedState: { [key: number]: boolean }; 
  toggleCollapse: (id: number) => void; 
  moveToTop: (index: number) => void; 
  addMoreJokes: (category: string, index: number) => Promise<void>; 
}

const JokeCategoryCard: React.FC<JokeCategoryCardProps> = ({ 
  item, 
  index, 
  collapsedState, 
  toggleCollapse, 
  moveToTop, 
  addMoreJokes 
}) => {
  const rotation = useSharedValue(collapsedState[item.id] ? 180 : 0);

  useEffect(() => {
    rotation.value = withTiming(collapsedState[item.id] ? 180 : 0, { duration: 200 });
  }, [collapsedState[item.id]]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.card}>
      <View style={styles.cardHeading}>
        <Text style={styles.title}>#{index + 1} {item.name}</Text>
        <View style={styles.cardButtons}>
          <TouchableOpacity style={styles.topButton} onPress={() => moveToTop(index)}>
            <Text style={styles.buttonTextWhite}>{index === 0 ? "Top" : "Go Top"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleCollapse(item.id)} style={styles.accordionButton}> 
            <Animated.View style={[animatedStyle]}>
              <Ionicons name="chevron-down" size={20} color="black" />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
      <Collapsible collapsed={collapsedState[item.id]}>
        {item.jokes.slice(0, item.jokeLimit).map((joke, i) => (
          <TouchableOpacity key={i} onPress={() => Alert.alert("Joke", joke)} style={styles.jokeItem}>
            <Text style={{ color: "white" }}>{joke}</Text>
          </TouchableOpacity>
        ))}
        {item.jokeLimit < 6 && (
          <TouchableOpacity style={styles.addMoreButton} onPress={() => addMoreJokes(item.name, index)}>
            <Text style={styles.buttonTextWhite}>Add More Jokes</Text>
          </TouchableOpacity>
        )}
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "rgba(244, 237, 221, 0.5)",
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
  },
  cardHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardButtons: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    maxWidth: '60%',
    flexWrap: 'wrap'
  },
  jokeItem: {
    padding: 10,
    backgroundColor: "rgb(52,52,52)",
    marginVertical: 5,
    borderRadius: 5,
  },
  topButton: {
    backgroundColor: "rgb(246,185,127)", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, 
    borderColor: "rgba(231,155,98, 0.7)",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    width: 100
  },
  addMoreButton: {
    backgroundColor: "rgb(246,185,127)", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, 
    borderColor: "rgba(231,155,98, 0.7)",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextWhite: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  accordionButton: {
    flexDirection: "row",
    alignItems: "center", 
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  }
});

export default JokeCategoryCard;
