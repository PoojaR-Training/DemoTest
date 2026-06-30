import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { Colors } from '../theme/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export const onBoard: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <View style={styles.illustrationContainer}>
        <Image
          source={require('../assest/onboarding_illustration.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Your Credit Score</Text>
        <Text style={styles.subtitle}>
          We provide you with the tools to monitor, understand, and improve your credit score.
        </Text>
      </View>

      <View style={styles.footer}>
      

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={async () => {
            navigation.replace('Login');
          }}
          activeOpacity={0.85}>
          <Text style={styles.nextArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  illustration: {
    width: width ,
    height: width,
  },
  contentContainer: {
    width: '100%',
    paddingHorizontal: 36,
    alignItems: 'flex-start',
    paddingBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 36,
    paddingBottom: 40,
    paddingTop: 25,
  },
  nextBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  nextArrow: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '600',
  },
});
