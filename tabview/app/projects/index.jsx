import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function ProjectLayout() {
    return (
        <Stack >
            <Stack.Screen name="index" options={{ title: "Projects" }} />
            <Stack.Screen name="reactnativeprojects" options={{ title: "React Native" }} />
            <Stack.Screen name="mernprojects" options={{ title: "MERN Stack" }} />
        </Stack>
    )
}

const styles = StyleSheet.create({})