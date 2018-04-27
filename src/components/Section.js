import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Section = (props) => {
	return(
		<View style={[styles.section, props.style]}>
			{props.children}
		</View>
		);
};

const styles = StyleSheet.create({
	section: {
		width: "80%",
	}
});

export {Section};