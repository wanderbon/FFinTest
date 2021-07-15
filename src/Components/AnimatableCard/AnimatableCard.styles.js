import { StyleSheet } from 'react-native';
import { CARD_HEIGHT } from '../../Utils/utils';

export default StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    height: CARD_HEIGHT,
    borderRadius: 24,
    zIndex: 1,
  },
  label: {
    textAlign: 'center',
  },
  labelsBlock: {
    width: '70%',
    position: 'absolute',
    zIndex: 0,
  },
  topLabelsBlock: {
    // marginBottom: 16,
  },
  bottomLabelsBlock: {
    // marginTop: 16,
  },
});
