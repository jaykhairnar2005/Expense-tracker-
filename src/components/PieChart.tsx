import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { colors } from '../theme';

interface PieChartProps {
  data: Array<{ category: string; value: number; percentage: number }>;
}

const { width } = Dimensions.get('window');
const SIZE = Math.min(width - 64, 300);
const RADIUS = SIZE / 2;
const STROKE_WIDTH = 40;

export function PieChart({ data }: PieChartProps) {
  const circumference = 2 * Math.PI * RADIUS;
  let currentAngle = -90;

  const shades = [
    '#ffffff',
    '#cccccc',
    '#999999',
    '#666666',
    '#444444',
    '#222222',
  ];

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE}>
        <G rotation={0} origin={`${RADIUS}, ${RADIUS}`}>
          {data.map((item, index) => {
            const angle = (item.percentage / 100) * 360;
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
            const rotation = currentAngle;
            currentAngle += angle;

            return (
              <Circle
                key={item.category}
                cx={RADIUS}
                cy={RADIUS}
                r={RADIUS - STROKE_WIDTH / 2}
                stroke={shades[index % shades.length]}
                strokeWidth={STROKE_WIDTH}
                fill="none"
                strokeDasharray={strokeDasharray}
                rotation={rotation}
                origin={`${RADIUS}, ${RADIUS}`}
              />
            );
          })}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});
