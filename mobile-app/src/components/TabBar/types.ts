import { BottomTabBarProps, BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { NavigationState } from "@react-navigation/native";

type ITabBarProps = BottomTabBarProps;
type ITabBarIcon = BottomTabNavigationOptions["tabBarIcon"];
type ITabRoute = NavigationState["routes"][0];

export { ITabBarProps, ITabBarIcon, ITabRoute };
