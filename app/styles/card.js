import colors from './colors';
import { headerHeight } from './header';
import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

const { height, width:w } = Dimensions.get('window');

const h = (Platform.OS === 'ios') ? (height - headerHeight):(height - headerHeight - StatusBar.currentHeight)

export const card = StyleSheet.create({
  container: {
    flex:1
  },
  card: {
    borderRadius: 10,
    flexDirection:'column',
    margin:10,
    height: (h - 20), // available height minus margins
    width: (w - 20), // available width minus margins
  },
  textContainer: {
    flex: 1,
    padding: 5,
    overflow:'hidden'
  },
  titleText: {
    textAlign: 'center',
    fontSize: 33,
  },
  detailText: {
    fontSize:22,
    textAlign:'center',
  },
  hopImage: {
    // 1/4 of card height is the container, 1/2 of that is the height
    // max ten images per row, so width is 1/10 of card width
    height: (h - 20)/8,
    width: (w - 20)/10,
  },
  imageContainer: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  hopImageContainer: {
    // this is combined with the above
    paddingVertical:2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
