import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const Details = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Details Screen!</Text>
      <Link href="/">
        <Button title="Go Back" />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Details;
