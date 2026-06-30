import { Colors } from '../theme/colors';
import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, FlatList, StatusBar, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { DUMMY_MESSAGES } from '../assest/data';

interface Message {
  id: string;
  sender: string;
  initials: string;
  image: any;
  avatarColor: string;
  preview: string;
  time: string;
  date: string;
  unread: boolean;
  status: 'online' | 'pending' | 'offline';
}

const statusColor = (status: Message['status']) => {
  if (status === 'online') return Colors.onlineGreen;
  if (status === 'pending') return Colors.onlinePending;
  return Colors.onlineGrey;
};

const MessageCard = ({
  item,
  onPress,
}: {
  item: Message;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
    <View style={styles.avatarWrapper}>
      <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
        <Image source={item.image} style={styles.avatarImage} />
      </View>
      <View
        style={[styles.statusDot, { backgroundColor: statusColor(item.status) }]}
      />
    </View>
    <View style={styles.cardContent}>
      <View style={styles.topRow}>
        <Text
          style={[styles.senderName, item.unread && styles.senderNameBold]}
          numberOfLines={1}>
          {item.sender}
        </Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <Text
        style={[styles.previewText, item.unread && styles.previewBold]}
        numberOfLines={2}>
        {item.preview}
      </Text>
    </View>
  </TouchableOpacity>
);

const SectionHeader = ({
  left,
  right,
}: {
  left: string;
  right?: string;
}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionLabel}>{left}</Text>
    {right ? <Text style={styles.sectionRight}>{right}</Text> : null}
  </View>
);

export const Mssage: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = DUMMY_MESSAGES.filter(
    m =>
      m.sender.toLowerCase().includes(search.toLowerCase()) ||
      m.preview.toLowerCase().includes(search.toLowerCase()),
  );

  const todayMsgs = filtered.filter(m => m.date === 'Today');
  const olderMsgs = filtered.filter(m => m.date !== 'Today');

  return (
    <View style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="chevron-left" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity>
          <Icon name="chevron-right" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={16} color={Colors.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Your messages"
          placeholderTextColor={Colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Icon name="x" size={16} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={[]}
        keyExtractor={() => ''}
        renderItem={() => null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {todayMsgs.length > 0 && (
              <>
                <SectionHeader left="Today" right="12/12/24" />
                <View style={styles.cardList}>
                  {todayMsgs.map(item => (
                    <MessageCard key={item.id} item={item} onPress={() => {}} />
                  ))}
                </View>
              </>
            )}

            {olderMsgs.length > 0 && (
              <>
                <SectionHeader left="12/10/24" />
                <View style={styles.cardList}>
                  {olderMsgs.map(item => (
                    <MessageCard key={item.id} item={item} onPress={() => {}} />
                  ))}
                </View>
              </>
            )}
          </>
        }
      />
        <View style={styles.newChatBtnWrapper}>
            <TouchableOpacity style={styles.newChatBtn} activeOpacity={0.85}>
              <Text style={styles.newChatBtnText}>Start a new chat</Text>
            </TouchableOpacity>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: 30,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 14,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },

  listContent: { paddingBottom: 100 },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  sectionRight: {
    fontSize: 11,
    color: Colors.textMuted,
    opacity: 0.7,
  },

  cardList: {
    paddingHorizontal: 12,
    gap: 8,
  },

  
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    alignItems: 'flex-start',
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    
    elevation: 2,
    borderWidth: 0.5,
    borderColor: Colors.divider,
  },

  avatarWrapper: { position: 'relative', marginRight: 12 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: { width: 48, height: 48, borderRadius: 24 },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: Colors.white,
  },

  cardContent: { flex: 1 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderName: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  senderNameBold: { fontWeight: '700' },
  timeText: { fontSize: 11, color: Colors.textMuted },
  previewText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  previewBold: { color: Colors.textPrimary },

  newChatBtnWrapper: { paddingHorizontal: 16, paddingTop: 16 },
  newChatBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newChatBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
  },
});