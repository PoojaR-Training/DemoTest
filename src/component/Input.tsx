import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../theme/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  isPassword = false,
  ...rest
}) => {
  const [secure, setSecure] = useState(isPassword);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputRow, error ? styles.inputError : null]}>
        {leftIcon && (
          <Icon name={leftIcon} size={18} color={Colors.textMuted} style={styles.leftIcon} />
        )}
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.textMuted}
          secureTextEntry={secure}
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setSecure(!secure)} style={styles.rightIcon}>
            <Icon name={secure ? 'eye-off' : 'eye'} size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
        {rightIcon && !isPassword && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
            <Icon name={rightIcon} size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    height: 50,
  },
  inputError: {
    borderColor: Colors.error,
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    padding: 4,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '400',
  },
  error: {
    fontSize: 12,
    color: Colors.error,
    marginTop: 4,
  },
});
