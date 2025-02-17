import Hello from '@/src/components/hello-component';
import SearchComponent from '@/src/components/search.component';
import { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Alert,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as Location from 'expo-location';
import { useDebounce } from '@/src/hooks/useDebounce';
import { WeatherData } from '@/src/models/api';
import Card from '@/src/components/core/card.component';
import IconSymbol from '@/src/components/core/icon-symbols.component';
import Divider from '@/src/components/divider.component';
import WeatherInfo from '@/src/components/weather-info.component';

export default function HomeScreen() {
  const { top, bottom } = useSafeAreaInsets();

  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData>(
    {} as WeatherData
  );

  const fetchWeatherByLocation = useCallback(
    async (lat: number, lon: number) => {
      setIsLoading(true);
      try {
        console.log('Location:', lat, lon);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.EXPO_PUBLIC_TOKEN}&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        Alert.alert('', 'Something went wrong, please try again later');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const fetchWeatherByCity = useCallback(async (city: string) => {
    if (city.length < 2) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.EXPO_PUBLIC_TOKEN}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      Alert.alert('', 'Something went wrong, please try again later');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('', 'Permission to access location is required', [
          {
            text: 'Ok',
            onPress: async () =>
              await Location.requestForegroundPermissionsAsync(),
          },
        ]);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchWeatherByLocation(
        location.coords.latitude,
        location.coords.longitude
      );
    }

    getCurrentLocation();
  }, [fetchWeatherByLocation]);

  const lazySearchUsers = useDebounce(fetchWeatherByCity, 1000);

  if (isLoading) {
    return (
      <View
        style={{
          top: top,
          bottom,
          paddingHorizontal: 16,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <ActivityIndicator
          testID='loading-indicator'
          size='large'
          color='#000'
        />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ top, bottom, paddingHorizontal: 16 }}>
      <Hello />
      <SearchComponent
        inputProps={{
          placeholder: 'Search',
          autoCapitalize: 'none',
          autoCorrect: false,
          keyboardType: 'default',
          returnKeyType: 'search',
          clearButtonMode: 'while-editing',
          enablesReturnKeyAutomatically: true,
          onSubmitEditing: () => lazySearchUsers(searchText),
          blurOnSubmit: true,
        }}
        onChange={(text) => {
          setSearchText(text);
        }}
        containerStyle={{ marginBottom: 10 }}
        value={searchText}
      />
      {!!weatherData.name ? (
        <WeatherInfo weatherData={weatherData} />
      ) : (
        <View style={[styles.center, styles.fill]}>
          <Text>Something went wrong, please try again later</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flexGrow: 1,
  },
});
