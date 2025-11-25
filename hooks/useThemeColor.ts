/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { ThemeColorName, colorRoles } from "@/design/tokens/theme";
import { useAppTheme } from "@/design/theme/ThemeProvider";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ThemeColorName
) {
  const { mode } = useAppTheme();
  const colorFromProps = props[mode];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return colorRoles[mode][colorName];
  }
}
