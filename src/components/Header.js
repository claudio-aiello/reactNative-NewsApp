import PropTypes from "prop-types";
import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function Header(props) {
  const {
    style,
    styleLeft,
    styleContentLeft,
    styleContentCenter,
    styleRight,
    styleRightSecond,
    styleContentRight,
    title,
    subTitle,
    onPressLeft,
    onPressRight,
    onPressRightSecond,
    renderLeft,
    renderRightSecond,
    renderRight,
  } = props;


  return (
    <View style={[styles.contain, style]}>
      <View style={[{ flex: 1 }, styleLeft]}>
        <TouchableOpacity
          style={[styles.contentLeft, styleContentLeft]}
          onPress={onPressLeft}
        >
          {renderLeft()}
        </TouchableOpacity>
      </View>
      <View style={[styles.contentCenter, styleContentCenter]}>
        <Text numberOfLines={1}>
          {title}
        </Text>

        {subTitle != "" && (
          <Text>
            {subTitle}
          </Text>
        )}
      </View>
      <View style={[styles.right, styleRight]}>
        <TouchableOpacity
          style={[styles.contentRightSecond, styleRightSecond]}
          onPress={onPressRightSecond}
        >
          {renderRightSecond()}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.contentRight, styleContentRight]}
          onPress={onPressRight}
        >
          {renderRight()}
        </TouchableOpacity>
      </View>
    </View>
  );
}

Header.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleContentLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleCenter: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleContentCenter: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRightSecond: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleContentRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  renderRightSecond: PropTypes.func,
  onPressRightSecond: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  barStyle: PropTypes.string,
};

Header.defaultProps = {
  style: {},
  styleLeft: {},
  styleContentLeft: {},
  styleCenter: {},
  styleContentCenter: {},
  styleRight: {},
  styleRightSecond: {},
  styleContentRight: {},
  renderLeft: () => {},
  renderRight: () => {},
  renderRightSecond: () => {},
  onPressLeft: () => {},
  onPressRight: () => {},
  onPressRightSecond: () => {},
  title: "Title",
  subTitle: "",
  barStyle: "",
};

const styles = StyleSheet.create({
    contain: { height: 45, flexDirection: "row" },
    contentLeft: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        width: 60,
    },
    contentCenter: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    contentRight: {
        justifyContent: "center",
        alignItems: "flex-end",
        paddingLeft: 10,
        paddingRight: 20,
        height: "100%",
    },
    contentRightSecond: {
        justifyContent: "center",
        alignItems: "flex-end",
        paddingLeft: 10,
        paddingRight: 10,
        height: "100%",
    },
    right: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
});