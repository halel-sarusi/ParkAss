import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';

import MapPreview from '../components/MapPreview';

const MyReportsScreen = () => {
  return(
    <ScrollView>
      <Image />
      <View>
        <Text></Text>
        <MapPreview />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

});

export default MyReportsScreen;