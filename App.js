import React from 'react';
import {view, Text} from 'react-native';

import FontAwsome5 from 'react-native-vector-icons/FontAwesome5';

const App = () => {
    return(
        <View style={{flex:1,justifyContent:'centre',alignItems:'centre'}}>
        <Text>Hello World!</Text>
        <FontAwsome5 name="quote-left" />   
        </View>
    )
}

export default App