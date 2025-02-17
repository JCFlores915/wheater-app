import React from 'react';
import { render } from '@testing-library/react-native';
import Card from '../src/components/core/card.component';
import { View, Text } from 'react-native';

describe('Card Component', () => {
  it('renders correctly with default styles', () => {
    const { getByTestId } = render(
      <Card>
        <Text testID="child">Hello World</Text>
      </Card>
    );

    const card = getByTestId('card-container');
    expect(card.props.style).toEqual(
      expect.objectContaining({
        borderRadius: 22,
        borderColor: 'blue',
        backgroundColor: '#e5e5ea',
        borderWidth: 0.6,
      })
    );
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <Card>
        <Text>Hello World</Text>
      </Card>
    );

    expect(getByText('Hello World')).toBeTruthy();
  });

  it('applies custom styles correctly', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <Card containerStyle={customStyle}>
        <Text>Hello World</Text>
      </Card>
    );

    
    const card = getByTestId('card-container');
    expect(card.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: 'red',
        borderRadius: 22,
        borderColor: 'blue',
        borderWidth: 0.6,
      })
    );
  });
})