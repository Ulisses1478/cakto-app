import { useEffect } from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { Image } from '@/assets/images';
import { RouteStackParams } from '@/navigation/routes';
import { ContextHook } from '@/contexts';
import { theme } from '@/styles/theme';
import {
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';

export function Splash({ navigation }: RouteStackParams<'Splash'>) {
  const { isReady, auth } = ContextHook.useAuth();

  const [loaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  useEffect(() => {
    if (!isReady || !loaded) return;
    if (auth?.token) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Start');
    }
  }, [isReady, loaded]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.color.secondary.normal,
        justifyContent: 'center',
        alignItems: 'center',
        height: theme.size.full,
        width: theme.size.full,
      }}>
      <Image.CaktoLogo />
    </View>
  );
}
