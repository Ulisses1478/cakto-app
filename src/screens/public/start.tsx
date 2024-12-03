import { Image } from '@/assets/images';
import { Button, Template, Text } from '@/components/ui';
import { theme } from '@/styles/theme';
import { Utils } from '@/utils';
import { Linking, View } from 'react-native';
import { RouteStackParams } from '@/navigation/routes';

export function Start({ navigation }: RouteStackParams<'Start'>) {
  return (
    <Template.Base
      style={{
        justifyContent: 'center',
      }}>
      <Image.CaktoLogo />
      <Text.Base style={{ fontSize: theme.font.size.xxl, lineHeight: 50 }}>
        {Utils.Constants.Text.start.title}
      </Text.Base>
      <View style={{ gap: theme.spacing.xxxs }}>
        <Button.Base
          onPress={() => navigation.navigate('Login')}
          title={Utils.Constants.Text.start.access}
          variant="filled"
          textProps={{ color: theme.color.secondary.normal }}
        />
        <Button.Base
          onPress={async () => {
            if (await Linking.canOpenURL(Utils.Constants.Url.register)) {
              Linking.openURL(Utils.Constants.Url.register);
            }
          }}
          title={Utils.Constants.Text.start.register}
          variant="unfilled"
        />
      </View>
    </Template.Base>
  );
}
