import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Button } from '../component/button';
import { Input } from '../component/Input';
import { Colors } from '../theme/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Storage } from '../utils/storage';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export const Login: React.FC<Props> = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!phone.trim()) newErrors.phone = 'Phone number required';
    if (!firstName.trim()) newErrors.firstName = 'First name required';
    if (!email.trim()) newErrors.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
          await Storage.saveUser({
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone,
      });

      navigation.replace('Tab');
    } catch (e) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">

        <View style={styles.logoSection}>
          <Text style={styles.logoText}>KOJO</Text>
          <View style={styles.taglineRow}>
            <View style={styles.taglineLine} />
            <Text style={styles.tagline}>Ally in Debt</Text>
            <View style={styles.taglineLine} />
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.fieldLabel}>Phone Number*</Text>
          <View style={styles.phoneRow}>
            <TouchableOpacity style={styles.countryCode}>
              <Text style={styles.flagText}>🇺🇸</Text>
              <Icon name="chevron-down" size={14} color={Colors.textMuted} />
            </TouchableOpacity>
            <View style={styles.phoneInput}>
              <Input
                placeholder="Enter Your Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                error={errors.phone}
                containerStyle={{ marginBottom: 0 }}
              />
            </View>
          </View>
          {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

          <View style={{ marginTop: 12 }}>
            <Text style={styles.fieldLabel}>First Name*</Text>
            <Input
              placeholder="Enter Your First Name"
              value={firstName}
              onChangeText={setFirstName}
              error={errors.firstName}
            />
          </View>

          <View>
            <Text style={styles.fieldLabel}>Last Name*</Text>
            <Input
              placeholder="Enter Your Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <View>
            <Text style={styles.fieldLabel}>Email Address*</Text>
            <Input
              placeholder="Enter Your Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />
          </View>

          <TouchableOpacity style={styles.biometricRow} activeOpacity={0.7}>
            <Icon name="shield" size={18} color={Colors.primary} />
            <Text style={styles.biometricText}>Use Biometric Login</Text>
          </TouchableOpacity>

          <Button
            title="Log In"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginBtn}
          />

          <View style={styles.keepRow}>
            <Text style={styles.keepText}>Keep me logged in</Text>
            <Switch
              value={keepLoggedIn}
              onValueChange={setKeepLoggedIn}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>

          <View style={styles.signupRow}>
            <Text style={styles.signupHint}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  container: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 16,
  },
  logoText: {
    fontSize: 38,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 8,
    marginBottom: 8,
  },
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  taglineLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
    maxWidth: 60,
  },
  tagline: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  form: {},
  fieldLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.inputBg,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    height: 50,
  },
  flagText: { fontSize: 18 },
  phoneInput: { flex: 1 },
  errorText: { fontSize: 12, color: Colors.error, marginTop: 2, marginBottom: 4 },
  biometricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    marginTop: 4,
  },
  biometricText: { fontSize: 14, color: Colors.primary, fontWeight: '500' },
  loginBtn: { borderRadius:30, marginBottom: 16 },
  keepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
    marginHorizontal:10
  },
  keepText: { fontSize: 14, color: Colors.textSecondary },
  signupRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  signupHint: { fontSize: 14, color: Colors.textSecondary },
  signupLink: { fontSize: 14, color: Colors.primary, fontWeight: '600' },
});
