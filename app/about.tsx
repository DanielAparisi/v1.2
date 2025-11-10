import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function AboutScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white px-8">
      <Text className="text-2xl font-bold text-black mb-4">About Liga A+7</Text>
      <Text className="text-gray-600 text-center mb-8">
        Welcome to Liga A+7, the premier soccer league management app.
      </Text>
      
      <Link href="/" asChild>
        <Text className="text-blue-600 text-base font-semibold underline">
          ← Back to Login
        </Text>
      </Link>
    </View>
  );
}