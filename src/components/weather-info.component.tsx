import { useMemo } from 'react';
import { WeatherData } from '../models/api';
import { StyleSheet, Text, View } from 'react-native';
import IconSymbol from './core/icon-symbols.component';
import Card from './core/card.component';
import Divider from './divider.component';
import WeatherDetailCard from './weather-detail.component';

const WeatherInfo = ({ weatherData }: { weatherData: WeatherData }) => {
  const weatherDescription = useMemo(
    () => weatherData.weather?.map((item) => item.description).join(', '),
    [weatherData.weather]
  );

  return (
    <>
      <View style={styles.center}>
        <IconSymbol name={{ ios: 'location.fill', android: 'location-enter' }} size={25} />
        <Text style={[styles.cityName, styles.textColor]}>{weatherData.name}</Text>
      </View>
      <Text style={[styles.tempText, styles.textColor]}>{weatherData.main?.temp.toFixed(0)}°</Text>
      <Card containerStyle={styles.cardStyle}>
        <Text style={[styles.weatherText, styles.textColor]}>{weatherDescription}</Text>
        <Divider variant='sm' />
      </Card>
      <View style={[styles.row, styles.spaceBetween]}>
        <WeatherDetailCard title="HUMIDITY" value={`${weatherData.main?.humidity}%`} />
        <WeatherDetailCard title="PRESSURE" value={`${weatherData.main?.pressure} hPa`} />
      </View>
      <View style={[styles.row, styles.spaceBetween]}>
        <WeatherDetailCard title="TEM. MAX" value={`${weatherData.main?.temp_max}°C`} />
        <WeatherDetailCard title="TEM. MIN" value={`${weatherData.main?.temp_min}°C`} />
      </View>
      <Card containerStyle={styles.cardStyle}>
        <View style={styles.center}>
          <View style={styles.row}>
            <IconSymbol name={{ ios: 'wind', android: 'weather-windy' }} />
            <Text style={[styles.weatherText, styles.ph6, styles.textColor]}>WIND</Text>
          </View>
          <View style={[styles.row, styles.spaceBetween, styles.center]}>
            <Text style={[styles.humidity, styles.textColor]}>Speed: {weatherData.wind?.speed} km/h</Text>
            <Text style={[styles.humidity, styles.textColor]}>Direction: {weatherData.wind?.deg}°</Text>
          </View>
        </View>
      </Card>
    </>
  );
};

export default WeatherInfo;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textColor: {
    color: '#000',
  },
  tempText: {
    fontSize: 50,
    fontWeight: 'regular',
    textAlign: 'center',
  },
  weatherText: {
    fontSize: 18,
  },
  cardStyle: {
    padding: 16,
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  ph6: {
    paddingHorizontal: 6,
  },
  humidity: {
    fontSize: 25,
    paddingVertical: 10,
  },
});
