import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  RefreshControl 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import JokeCard from "@/components/JokeCategoryCard"; 

interface JokeCategory {
  id: number;
  name: string;
  jokes: string[];
  jokeLimit: number;
}

const API_CATEGORIES = "https://v2.jokeapi.dev/categories";

export default function App() {
  const [data, setData] = useState<JokeCategory[]>([]);
  const [collapsedState, setCollapsedState] = useState<{ [key: number]: boolean }>({});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (): Promise<void> => {
    setRefreshing(true);
    try {
      const response = await fetch(API_CATEGORIES);
      const result = await response.json();

      const categoryList: JokeCategory[] = await Promise.all(
        result.categories.map(async (category: string, index: number) => {
          const jokes = await fetchJokes(category, 2);
          return { id: index + 1, name: category, jokes, jokeLimit: 2 };
        })
      );

      setData(categoryList);
      setCollapsedState(categoryList.reduce((acc, item) => ({ ...acc, [item.id]: true }), {}));
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchJokes = async (category: string, amount: number): Promise<string[]> => {
    try {
      const response = await fetch(`https://v2.jokeapi.dev/joke/${category}?type=single&amount=${amount}`);
      const result = await response.json();
      return result.jokes ? result.jokes.map((joke: { joke: string }) => joke.joke) : [];
    } catch (error) {
      console.error("Error fetching jokes:", error);
      return [];
    }
  };

  const addMoreJokes = async (category: string, index: number): Promise<void> => {
    if (data[index].jokeLimit >= 6) return;
    
    const newJokes = await fetchJokes(category, 2);
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].jokes = [...updatedData[index].jokes, ...newJokes];
      updatedData[index].jokeLimit += 2;
      return updatedData;
    });
  };

  const moveToTop = (index: number): void => {
    setData((prevData) => {
      const updatedData = [...prevData];
      const item = updatedData.splice(index, 1)[0];
      updatedData.unshift(item);
      return updatedData;
    });
  };

  const toggleCollapse = (id: number): void => {
    setCollapsedState((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <LinearGradient 
      colors={["#f5e3d6", "#e8c7b2"]} 
      start={{ x: 0, y: 0.5 }} 
      end={{ x: 1, y: 0.5 }} 
      style={styles.container}
    >
      <Text style={styles.headingText}>Care {"\n"}for any {"\n"}jokes?</Text>
      
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <JokeCard
            item={item}
            index={index}
            collapsedState={collapsedState}
            toggleCollapse={toggleCollapse}
            moveToTop={moveToTop}
            addMoreJokes={addMoreJokes}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchCategories} />} 
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
    fontFamily: 'DMSerifText-Regular'
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0e2c9",
  },
});

