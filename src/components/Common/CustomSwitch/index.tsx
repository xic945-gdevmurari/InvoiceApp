import React, {FC} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';

import {useTheme} from '@react-navigation/native';
import {icons} from '../../../helpers/iconConstant';
import {hp, wp} from '../../../helpers/constants';

interface props {
  value: boolean;
  language?: boolean;
  onTogglePress: () => void;
}

const CustomSwitch: FC<props> = ({value, language, onTogglePress}) => {
  const {colors} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onTogglePress}
        activeOpacity={1}
        style={{
          ...styles.switchContainer,
          backgroundColor: value ? '#DCDCDC' : '#DCDCDC',
        }}>
        <View style={{alignSelf: value ? 'flex-end' : 'flex-start'}}>
          <View style={styles.switchCricle}>
            {value ? (
              <Image
                source={language ? icons.india : icons.dark}
                style={{
                  height: wp(5),
                  width: wp(5),
                  tintColor: language ? '' : 'white',
                }}
                resizeMode={'cover'}
              />
            ) : (
              <Image
                source={language ? icons.france : icons.light}
                style={{
                  height: wp(5),
                  width: wp(5),
                  tintColor: language ? '' : 'yellow',
                }}
                resizeMode={'contain'}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const getGlobalStyles = (props: object) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginTop: hp(1),
      marginHorizontal: wp(5.33),
    },
    switchCricle: {
      height: hp(3.0),
      width: hp(3.0),
      borderRadius: hp(1.5),
      marginHorizontal: wp(0.4),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: props.colors.commonColor,
    },
    switchContainer: {
      width: wp(11),
      height: hp(3.5),
      borderRadius: wp(3.7),
      justifyContent: 'center',
    },
    modeText: {
      fontSize: wp(4),
      color: props.colors.primaryWhite,
    },
  });

export default CustomSwitch;
