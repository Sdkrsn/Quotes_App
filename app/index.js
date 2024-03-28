import React,{useState,useEffect} from 'react';
import {Text, View,TouchableOpacity, Linking, ScrollView, SafeAreaView } from "react-native";
import FontAwsome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import Clipboard from '@react-native-clipboard/clipboard';



const App = () => {
  const[Quote,setQuote] = useState('Loading...');
  const[Author,setAuthor] = useState('Loading...');
  const[isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);


  const randomQuote = () => {
    setIsLoading(true);
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result =>{
      console.log(result.content);
      setQuote(result.content);
      setAuthor(result.author);
      setIsLoading(false);
    })
  }
  useEffect(() =>{
    randomQuote();
  },[]);


const copyToClipboard = () => {
  Clipboard.setString(Quote);
}

const tweetnow = () => {
  const url = "https://twitter.com/intent/post?text="+Quote;
  Linking.openURL(url);
}

const addToFavorites = () => {
  setFavorites(prevFavorites => [...prevFavorites, { Quote, Author }]);
}
  
  


  return(
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#E50914'}}>
      <View style={{width:'90%',backgroundColor:'#fff',borderRadius:20,padding:20}}>
        <Text 
        style={{
          textAlign:'center',
          fontSize:26, 
          fontWeight:'600', 
          color:'#333',
          marginBottom:20
        }}>
        Quote Of The Day
        </Text>
        <FontAwsome5 name="quote-left" style={{fontSize:20,marginBottom:-12}} color="#000"  />
        <Text 
        style={{
          color:'#000',
          fontSize:16,
          lineHeight:26,
          letterSpacing:1.1,
          fontWeight:'400',
          textAlign:'center',
          marginBottom:10,
          paddingHorizontal:30,
          }}>
          {Quote}
          </Text>
          <FontAwsome5 name="quote-right" style={{fontSize:20,textAlign:"right",marginTop:-20,marginBottom:20}} color="#000"  />
          <Text style={{textAlign:'right',fontWeight:'300',fontStyle:'italic',fontSize:16,color:'#000'}}>-{Author}</Text>
          <TouchableOpacity 
          onPress={randomQuote} 
          style={{
            backgroundColor:isLoading ? 'rgba(229, 9, 20, 0.7)' : 'rgba(229, 9, 20, 1)',
            padding:20,
            borderRadius:30,
            marginVertical:20
            }}>
            <Text style={{color:'#fff',fontSize:18,textAlign:'center'}}>{isLoading ? "Loading.." : "New Quote"}</Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row',justifyContent:'space-around'}} />
          <TouchableOpacity onPress={addToFavorites} style={{ borderWidth: 2, borderColor: '#E50914', borderRadius: 50, padding: 15 }}>
            <FontAwsome name="bookmark" size={22} color="#E50914" />
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={copyToClipboard}
          style={{
            borderWidth:2,
            borderColor:'#E50914',
            borderRadius:50,
            padding:15
          }}>
          <FontAwsome name="copy" size={22} color="#E50914"  />
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={tweetnow}
          style={{
            borderWidth:2,
            borderColor:'#E50914',
            borderRadius:50,
            padding:15
          }}>
          <FontAwsome name="twitter" size={22} color="#E50914"  />
          </TouchableOpacity>
      </View>
      <ScrollView style={{ maxHeight: 200, marginTop: 20 }}>
          {favorites.map((favorite, index) => (
            <View key={index} style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10 }}>
              <Text style={{ color: '#000', fontSize: 16 }}>{favorite.Quote}</Text>
              <Text style={{ color: '#000', fontSize: 14, fontStyle: 'italic' }}> - {favorite.Author}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      </SafeAreaView>
  )
}

export default App