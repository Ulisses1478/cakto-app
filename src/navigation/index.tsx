import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES, StackParams } from "./routes";
import { Context } from "@/contexts";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator<StackParams>();

const unprotectRoutes = Object.values(ROUTES).filter(
  (route) => !route.protected
);

const authenticatedRoutes = Object.values(ROUTES).filter(
  (route) => route.protected
);

export default function RootStack() {
  return (
    <Context.AuthProvider>
      <StatusBar style="light" />
      <NavigationContainer>
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
              options={{ headerShown: false }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Context.AuthProvider>
  );
}

export { ROUTES };
