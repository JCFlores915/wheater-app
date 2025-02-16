import React, { PropsWithChildren } from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  TextInput,
  StyleProp,
  TextInputProps,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import IconSymbol from './core/icon-symbols.component';

type Props = PropsWithChildren<{
  isLoading?: boolean;
  value: string;

  inputProps?: Omit<TextInputProps, 'multiline' | 'style' | 'secureTextEntry'>;

  /** EVENTS */
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;

  /** STYLES */
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}>;

const Search: React.FC<Props> = (props): React.ReactNode => {
  return (
    <View style={[props.containerStyle]}>
      <View style={[styles.container]}>
        <IconSymbol
          size={16}
          color={'blue'}
          name={{ ios: 'magnifyingglass', android: 'magnify' }}
        />

        <TextInput
          value={props.value}
          onChangeText={props.onChange}
          selectionColor={'blue'}
          placeholderTextColor={'blue'}
          style={[styles.textInput, props.inputStyle]}
          {...props.inputProps}
          autoComplete='off'
          multiline={false}
        />

        {props.isLoading && (
          <View style={[styles.loading]}>
            <ActivityIndicator
              size='small'
              color={'blue'}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 42,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
    borderWidth: 0.6,
    borderRadius: 14,
    borderColor: 'blue',
    backgroundColor: '#e5e5ea',
  },
  textInput: {
    fontSize: 14,
    flexGrow: 1,
    flexShrink: 1,
    height: '100%',
    fontWeight: 'normal',
    color: 'blue',
  },
  loading:{
    position: 'absolute',
    right: 0,
    height: '100%',
    justifyContent: 'center',
    paddingRight: 15,
    alignItems: 'center',
  }
});

export default React.memo(Search);
