import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../theme/colors';
import { Storage } from '../utils/storage';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

const GAUGE_SIZE = 200;
const STROKE_W = 16;

interface GaugeProps {
  score: number;
}

const CreditGauge: React.FC<GaugeProps> = ({ score }) => {
  const MIN = 300;
  const MAX = 850;
  const pct = (score - MIN) / (MAX - MIN);

  const TOTAL_DEG = 220;
  const START_DEG = 160;
  const R = (GAUGE_SIZE - STROKE_W) / 2;
  const CX = GAUGE_SIZE / 2;
  const CY = GAUGE_SIZE / 2;

  const SEGMENTS = 38;
  const SEG_DEG = TOTAL_DEG / SEGMENTS;
  const filledCount = Math.round(pct * SEGMENTS);

  const segColor = (i: number) => {
    const t = i / (SEGMENTS - 1);
    if (t < 0.3) return '#F44336';
    if (t < 0.6) return '#FFC107';
    return '#4CAF50';
  };

  const scoreLabel =
    pct < 0.3 ? 'Poor' : pct < 0.5 ? 'Fair' : pct < 0.7 ? 'Good' : 'Excellent';
  const scoreColor = pct < 0.3 ? '#F44336' : pct < 0.6 ? '#FFC107' : '#4CAF50';

  const segments = Array.from({ length: SEGMENTS }, (_, i) => {
    const angleDeg = START_DEG + i * SEG_DEG + SEG_DEG / 2;
    const angleRad = (angleDeg * Math.PI) / 180;
    const cx = CX + R * Math.cos(angleRad);
    const cy = CY + R * Math.sin(angleRad);
    const filled = i < filledCount;
    const isThumb = i === filledCount - 1;
    const dotSize = isThumb ? STROKE_W + 4 : STROKE_W - 4;

    return (
      <View
        key={i}
        style={{
          position: 'absolute',
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: filled ? segColor(i) : '#E8E8E8',
          left: cx - dotSize / 2,
          top: cy - dotSize / 2,
          ...(isThumb
            ? {
                borderWidth: 2.5,
                borderColor: '#FFFFFF',
                shadowColor: scoreColor,
                shadowOpacity: 0.6,
                shadowRadius: 5,
                elevation: 6,
              }
            : {}),
        }}
      />
    );
  });

  return (
    <View
      style={{
        width: GAUGE_SIZE,
        height: GAUGE_SIZE * 0.72,
        position: 'relative',
      }}
    >
      {/* Arc dots */}
      <View
        style={{
          width: GAUGE_SIZE,
          height: GAUGE_SIZE,
          position: 'absolute',
          top: 0,
        }}
      >
        {segments}
      </View>

      {/* Center text: label, score, +pts badge */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
        }}
      >
        <Text style={[styles.scoreGoodLabel, { color: scoreColor }]}>
          {scoreLabel}
        </Text>
        <Text style={styles.scoreNumber}>{score}</Text>
        <View style={styles.ptsBadge}>
          <Text style={styles.ptsBadgeText}>+10pts</Text>
        </View>
      </View>
    </View>
  );
};

const GRAPH_DATA = [
  { month: 'Jan', score: 680 },
  { month: 'Feb', score: 690 },
  { month: 'Mar', score: 675 },
  { month: 'Apr', score: 695 },
  { month: 'May', score: 700 },
  { month: 'Jun', score: 688 },
  { month: 'Jul', score: 704 },
];

const GRAPH_H = 110;
const GRAPH_W = CARD_WIDTH - 32;
const PAD_L = 32;
const PAD_T = 8;
const PAD_B = 24;

const CreditGraph: React.FC = () => {
  const scores = GRAPH_DATA.map(d => d.score);
  const minS = Math.min(...scores) - 20;
  const maxS = Math.max(...scores) + 20;
  const drawW = GRAPH_W - PAD_L - 8;
  const drawH = GRAPH_H - PAD_T - PAD_B;

  const xOf = (i: number) => PAD_L + (i / (GRAPH_DATA.length - 1)) * drawW;
  const yOf = (s: number) =>
    PAD_T + drawH - ((s - minS) / (maxS - minS)) * drawH;

  const lineSegments = GRAPH_DATA.slice(0, -1).map((d, i) => {
    const x1 = xOf(i);
    const y1 = yOf(d.score);
    const x2 = xOf(i + 1);
    const y2 = yOf(GRAPH_DATA[i + 1].score);
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return { x1, y1, length, angle };
  });

  const yLabels = [maxS, Math.round((maxS + minS) / 2), minS];

  return (
    <View style={{ width: GRAPH_W, height: GRAPH_H }}>
      {yLabels.map((val, i) => {
        const y = yOf(val);
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              left: 0,
              top: y - 6,
              flexDirection: 'row',
              alignItems: 'center',
              width: GRAPH_W,
            }}
          >
            <Text style={styles.graphAxisLabel}>{val}</Text>
            <View style={styles.graphGridLine} />
          </View>
        );
      })}

      {lineSegments.map((seg, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            left: seg.x1,
            top: seg.y1 - 1.25,
            width: seg.length,
            height: 2.5,
            backgroundColor: Colors.primary,
            transformOrigin: 'left center',
            transform: [{ rotate: `${seg.angle}deg` }],
          }}
        />
      ))}

      {GRAPH_DATA.map((d, i) => {
        const isLast = i === GRAPH_DATA.length - 1;
        const size = isLast ? 10 : 6;
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              left: xOf(i) - size / 2,
              top: yOf(d.score) - size / 2,
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: isLast ? Colors.primary : Colors.white,
              borderWidth: 2,
              borderColor: Colors.primary,
            }}
          />
        );
      })}

      {GRAPH_DATA.map((d, i) => (
        <Text
          key={i}
          style={[
            styles.graphAxisLabel,
            {
              position: 'absolute',
              left: xOf(i) - 12,
              bottom: 2,
              width: 24,
              textAlign: 'center',
            },
          ]}
        >
          {d.month}
        </Text>
      ))}
    </View>
  );
};

const QUICK_ACTIONS = [
  { icon: 'send', label: 'Pay\nMoney', color: '#EEF2FF' },
  { icon: 'file-text', label: 'Loan\nRequest', color: '#FFF7ED' },
  { icon: 'message-square', label: 'Chat\nSupport', color: '#F0FDF4' },
  { icon: 'bar-chart-2', label: 'Finance\nHub', color: '#FFF1F2' },
];

export const Home: React.FC = () => {
  const [userName, setUserName] = useState('Sarah');

  useEffect(() => {
    Storage.getUser().then(u => {
      if (u?.name) setUserName(u.name.split(' ')[0]);
    });
  }, []);

  return (
    <View style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi, {userName} 👋</Text>
            <Text style={styles.subGreeting}>
              Your credit in excellent shape!
            </Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Icon name="bell" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Credit Score Card */}
        <View style={styles.scoreCard}>
          {/* Gauge */}
          <View style={styles.gaugeWrapper}>
            <CreditGauge score={704} />
          </View>

          {/* Bottom row: 400 | update text | 850 */}
          <View style={styles.gaugeBottomRow}>
            <Text style={styles.rangeEdgeLabel}>400</Text>
            <View style={styles.updatePill}>
              <Icon name="calendar" size={12} color={Colors.black} />
              <Text style={styles.updatePillText}>update on 02 Oct 2024</Text>
            </View>
            <Text style={styles.rangeEdgeLabel}>850</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsRow}>
          {QUICK_ACTIONS.map((action, i) => (
            <TouchableOpacity
              key={i}
              style={styles.actionItem}
              activeOpacity={0.75}
            >
              <View
                style={[styles.actionIconBg, { backgroundColor: action.color }]}
              >
                <Icon
                  name={action.icon as any}
                  size={22}
                  color={Colors.primary}
                />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Credit Score History */}
        <View style={styles.graphCard}>
          <View style={styles.graphHeader}>
            <Text style={styles.graphTitle}>Credit Score History</Text>
            <TouchableOpacity>
              <Icon name="more-horizontal" size={20} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>
          <CreditGraph />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  container: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 100 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  greeting: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  subGreeting: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  scoreCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  gaugeWrapper: { alignItems: 'center', marginBottom: 10 },

  scoreGoodLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  scoreNumber: {
    fontSize: 44,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -1,
  },
  ptsBadge: {
    marginTop: 4,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  ptsBadgeText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },

  gaugeBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 6,
  },
  rangeEdgeLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
    width: 30,
    textAlign: 'center',
  },
  updatePill: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  updatePillText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '500',
    marginLeft: 5,
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionItem: { alignItems: 'center', flex: 1 },
  actionIconBg: {
    width: 56,
    height: 56,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  actionLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 15,
  },

  graphCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  graphHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  graphTitle: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  graphAxisLabel: {
    fontSize: 9,
    color: Colors.textMuted,
    width: 28,
    textAlign: 'right',
  },
  graphGridLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.divider,
    marginLeft: 4,
  },
});
