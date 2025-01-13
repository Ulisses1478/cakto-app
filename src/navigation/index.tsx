import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import ToastManager from "toastify-react-native";

import { ROUTES, StackParams } from "./routes";
import { Context } from "../contexts";

import { toast } from "@/components/ui";

const Stack = createStackNavigator<StackParams>();
export const navigationRef = createNavigationContainerRef();

const unprotectRoutes = Object.values(ROUTES).filter(
  (route) => !route.protected
);

const authenticatedRoutes = Object.values(ROUTES).filter(
  (route) => route.protected
);

export default function RootStack() {
  return (
    <Context.AuthProvider>
      <Context.PinProvider>
        <StatusBar style="light" />
        <NavigationContainer ref={navigationRef}>
          <ToastManager
            showCloseIcon={false}
            textStyle={toast.styles.text}
            style={toast.styles.container}
          />
          <Stack.Navigator initialRouteName={unprotectRoutes[0].name}>
            {unprotectRoutes.map((route) => (
              <Stack.Screen
                key={route.name}
                name={route.name}
                component={route.component}
                options={{ headerShown: false }}
              />
            ))}

            {authenticatedRoutes.map((route) => (
              <Stack.Screen
                key={route.name}
                name={route.name}
                component={route.component}
                options={{
                  headerShown: false,
                  gestureEnabled: route.gestureEnabled ?? true,
                }}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </Context.PinProvider>
    </Context.AuthProvider>
  );
}

export { ROUTES };
