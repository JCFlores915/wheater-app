import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import HomeScreen from '@/src/app/(app)';

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0 }),
}));

jest.mock('@/src/hooks/useDebounce', () => ({
  useDebounce: (fn: Function) => fn,
}));

global.fetch = jest.fn();

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches weather by location on mount', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'granted' });
    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
      coords: { latitude: 37.7749, longitude: -122.4194 },
    });

    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        name: 'San Francisco',
        main: { temp: 15 },
        weather: [{ description: 'clear sky' }],
      }),
    });

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText('San Francisco')).toBeTruthy();
      expect(getByText('15°')).toBeTruthy();
      expect(getByText('clear sky')).toBeTruthy();
    });
  });

  it('fetches weather by city when search text changes', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        name: 'New York',
        main: { temp: 20 },
        weather: [{ description: 'cloudy' }],
      }),
    });

    const { getByPlaceholderText, getByText } = render(<HomeScreen />);
    const searchInput = getByPlaceholderText('Search');

    fireEvent.changeText(searchInput, 'New York');

    await waitFor(() => {
      expect(getByText('New York')).toBeTruthy();
      expect(getByText('20°')).toBeTruthy();
      expect(getByText('cloudy')).toBeTruthy();
    });
  });

  it('shows an alert if location permission is denied', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'denied' });

    render(<HomeScreen />);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('', 'Permission to access location is required', [
        { text: 'Ok', onPress: expect.any(Function) },
      ]);
    });
  });

  it('shows loading indicator while fetching data', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'granted' });
    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
      coords: { latitude: 37.7749, longitude: -122.4194 },
    });

    (global.fetch as jest.Mock).mockImplementation(() =>
      new Promise((resolve) => setTimeout(() => resolve({ json: jest.fn().mockResolvedValue({}) }), 1000))
    );

    const { getByTestId } = render(<HomeScreen />);

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
});