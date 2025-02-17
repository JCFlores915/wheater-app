import { StyleSheet, Text, View } from 'react-native';
import Card from './core/card.component';
import IconSymbol from './core/icon-symbols.component';

const WeatherDetailCard = ({ title, value }: { title: string; value: string }) => (
  <Card containerStyle={[styles.cardStyle, styles.fill]}>
    <View style={styles.row}>
      <IconSymbol name={{ ios: 'humidity.fill', android: 'water-alert' }} />
      <Text style={[styles.weatherText, styles.ph6, styles.textColor]}>{title}</Text>
    </View>
    <Text style={[styles.humidity, styles.textColor]}>{value}</Text>
  </Card>
);

export default WeatherDetailCard;

const styles = StyleSheet.create({
  fill: {
    flexGrow: 1,
  },
  cardStyle: {
    padding: 16,
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
  },
  ph6: {
    paddingHorizontal: 6,
  },
  weatherText: {
    fontSize: 18,
  },
  textColor: {
    color: '#000',
  },
  humidity: {
    fontSize: 25,
    paddingVertical: 10,
  },
})