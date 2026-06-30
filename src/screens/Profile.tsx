import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../theme/colors';
import { Storage } from '../utils/storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import profile from '../assest/profile.png'
type Props = {
  navigation: NativeStackNavigationProp<any>;
};
const AvatarView = ({ name }: { name: string }) => {

  return (
    <View style={avatarStyles.outer}>
      <Image source={profile} style={avatarStyles.inner}/>
    </View>
  );
};

const avatarStyles = StyleSheet.create({
  outer: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.primary + '30',
  },
  inner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const InfoRow = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIconBg}>
      <Icon name={icon as any} size={16} color={Colors.primary} />
    </View>
    <View style={styles.infoText}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const SecurityRow = ({
  icon,
  label,
  subtitle,
  value,
  onChange,
}: {
  icon: string;
  label: string;
  subtitle: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) => (
  <View style={styles.securityRow}>
    <View style={styles.infoIconBg}>
      <Icon name={icon as any} size={16} color={Colors.primary} />
    </View>
    <View style={styles.securityText}>
      <Text style={styles.secLabel}>{label}</Text>
      <Text style={styles.secSubtitle}>{subtitle}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ false: Colors.toggleInactive, true: Colors.primary }}
      thumbColor={Colors.white}
    />
  </View>
);

export const Profile: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState({ name: 'Sarah Joe', email: 'sample@example.com', phone: '000-000-0000' });
  const [faceId, setFaceId] = useState(false);
  const [fingerprint, setFingerprint] = useState(false);

  useEffect(() => {
    Storage.getUser().then(u => {
      if (u) setUser({ name: u.name, email: u.email, phone: u.phone });
    });
  }, []);

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await Storage.logout();
          navigation.replace('Login');
        },
      },
    ]);
  };

  return (
    <View style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="chevron-left" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Icon name="chevron-right" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>

        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <AvatarView name={user.name} />
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Icon name="edit-2" size={12} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
        </View>

        <View style={styles.card}>
          <InfoRow icon="mail" label="Email" value={user.email} />
          <View style={styles.divider} />
          <InfoRow icon="phone" label="Phone" value={user.phone} />
          <View style={styles.divider} />
          <InfoRow icon="calendar" label="DOB" value="01 Jan 1995" />
        </View>

        <Text style={styles.sectionTitle}>Security</Text>
        <View style={styles.card}>
          <SecurityRow
            icon="cpu"
            label="Face ID"
            subtitle="Use Face ID to unlock the app"
            value={faceId}
            onChange={setFaceId}
          />
          <View style={styles.divider} />
          <SecurityRow
            icon="activity"
            label="Fingerprint"
            subtitle="Use fingerprint to unlock the app"
            value={fingerprint}
            onChange={setFingerprint}
          />
        </View>

        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
            <View style={styles.infoIconBg}>
              <Icon name="sun" size={16} color={Colors.primary} />
            </View>
            <Text style={styles.menuLabel}>Theme</Text>
            <View style={styles.menuRight}>
              <Text style={styles.menuValue}>Light</Text>
              <Icon name="chevron-right" size={16} color={Colors.textMuted} />
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
            <View style={styles.infoIconBg}>
              <Icon name="globe" size={16} color={Colors.primary} />
            </View>
            <Text style={styles.menuLabel}>Language</Text>
            <View style={styles.menuRight}>
              <Text style={styles.menuValue}>English</Text>
              <Icon name="chevron-right" size={16} color={Colors.textMuted} />
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Icon name="log-out" size={18} color={Colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { paddingHorizontal: 16, paddingBottom: 100 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary },
  avatarSection: { alignItems: 'center', paddingVertical: 24 },
  avatarContainer: { position: 'relative', marginBottom: 12 },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  userName: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  infoIconBg: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  infoText: { flex: 1 },
  infoLabel: { fontSize: 12, color: Colors.textMuted, marginBottom: 2 },
  infoValue: { fontSize: 14, fontWeight: '500', color: Colors.textPrimary },
  divider: { height: 1, backgroundColor: Colors.divider, marginLeft: 66 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 10,
    marginTop: 4,
    paddingHorizontal: 4,
  },
  securityRow: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  securityText: { flex: 1 },
  secLabel: { fontSize: 14, fontWeight: '500', color: Colors.textPrimary },
  secSubtitle: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  menuRow: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '500', color: Colors.textPrimary },
  menuRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  menuValue: { fontSize: 13, color: Colors.textMuted },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: '#FFF1F2',
    marginTop: 4,
  },
  logoutText: { fontSize: 15, fontWeight: '600', color: Colors.error },
});
