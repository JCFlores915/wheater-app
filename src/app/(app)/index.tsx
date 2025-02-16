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
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
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
          size='large'
          color='#000'
        />
      </View>
    );
  }

  console.log('Weather Data:', !!weatherData.name);

  return (
    <ScrollView
      contentContainerStyle={{
        top: top,
        bottom,
        paddingHorizontal: 16,
      }}
    >
      <Hello />
      <SearchComponent
        onChange={(text) => {
          setSearchText(text);
          lazySearchUsers(text);
        }}
        containerStyle={[{ marginBottom: 10 }]}
        value={searchText}
      />
      {!!weatherData.name ? (
        <>
          <View
            style={[
              {
                paddingVertical: 16,
              },
            ]}
          >
            <View style={[styles.center]}>
              <IconSymbol
                name={{ ios: 'location.fill', android: 'location-enter' }}
                size={25}
              />
              <Text style={[styles.cityName, styles.textColor]}>
                {weatherData.name}
              </Text>
            </View>
            <Text style={[styles.tempText, styles.textColor]}>
              {weatherData.main?.temp.toFixed(0)}°
            </Text>
          </View>

          <Card containerStyle={[styles.cardStyle]}>
            <Text style={[styles.weatherText, styles.textColor]}>
              {weatherData.weather?.map((item) => item.description).join(', ')}
            </Text>
            <Divider variant='sm' />
          </Card>
          <View style={[styles.row, styles.spaceBetween]}>
            <Card containerStyle={[styles.cardStyle, styles.fill]}>
              <View style={[styles.row]}>
                <IconSymbol
                  name={{ ios: 'humidity.fill', android: 'water-alert' }}
                />
                <Text
                  style={[styles.weatherText, styles.ph6, styles.textColor]}
                >
                  HUMIDITY
                </Text>
              </View>
              <Text style={[styles.humidity, styles.textColor]}>
                {weatherData.main?.humidity}%
              </Text>
            </Card>
            <View style={{ width: 16 }} />
            <Card containerStyle={[styles.cardStyle, styles.fill]}>
              <View style={[styles.row]}>
                <IconSymbol
                  name={{ ios: 'humidity.fill', android: 'water-alert' }}
                />
                <Text
                  style={[styles.weatherText, styles.ph6, styles.textColor]}
                >
                  PRESSURE
                </Text>
              </View>
              <Text style={[styles.humidity, styles.textColor]}>
                {weatherData.main?.pressure}%
              </Text>
            </Card>
          </View>
          <View style={[styles.row, styles.spaceBetween]}>
            <Card containerStyle={[styles.cardStyle, styles.fill]}>
              <View style={[styles.row]}>
                <IconSymbol
                  name={{
                    ios: 'thermometer.high',
                    android: 'temperature-celsius',
                  }}
                />
                <Text
                  style={[styles.weatherText, styles.ph6, styles.textColor]}
                >
                  TEM. MAX
                </Text>
              </View>
              <Text style={[styles.humidity, styles.textColor]}>
                {weatherData.main?.temp_max}%
              </Text>
            </Card>
            <View style={{ width: 16 }} />
            <Card containerStyle={[styles.cardStyle, styles.fill]}>
              <View style={[styles.row]}>
                <IconSymbol
                  name={{
                    ios: 'thermometer.low',
                    android: 'temperature-celsius',
                  }}
                />
                <Text
                  style={[styles.weatherText, styles.ph6, styles.textColor]}
                >
                  TEM. MIN
                </Text>
              </View>
              <Text style={[styles.humidity, styles.textColor]}>
                {weatherData.main?.temp_min}%
              </Text>
            </Card>
          </View>
          <Card containerStyle={[styles.cardStyle]}>
            {/* Velocidad del viento */}
            <View style={[styles.center]}>
              <View style={[styles.row]}>
                <IconSymbol name={{ ios: 'wind', android: 'weather-windy' }} />
                <Text
                  style={[styles.weatherText, styles.ph6, styles.textColor]}
                >
                  WIND
                </Text>
              </View>
              <View style={[styles.row, styles.spaceBetween, styles.center]}>
                <Text style={[styles.humidity, styles.textColor]}>Wind </Text>
                <Text style={[styles.humidity, styles.textColor]}>
                  {weatherData.wind?.speed} km/h
                </Text>
              </View>
              <View style={[styles.row, styles.spaceBetween, styles.center]}>
                <Text style={[styles.humidity, styles.textColor]}>Dir </Text>
                <Text style={[styles.humidity, styles.textColor]}>
                  {weatherData.wind?.deg} km/h
                </Text>
              </View>
           
            </View>
          </Card>
        </>
      ) : (
        <View style={[styles.center, styles.fill]}>
          <Text>Something went wrong, please try again later</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textColor: {
    color: '#000',
  },
  weatherContainer: {
    marginTop: 20,
  },
  weatherText: {
    fontSize: 18,
  },
  cardStyle: {
    padding: 16,
    marginVertical: 16,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tempText: {
    fontSize: 50,
    fontWeight: 'regular',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  ph6: {
    paddingHorizontal: 6,
  },
  humidity: {
    fontSize: 25,
    paddingVertical: 10,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  fill: {
    flexGrow: 1,
  },
  vertical0: {
    paddingVertical: 0,
  },
});
