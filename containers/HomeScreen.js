import React from 'react';
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity, useWindowDimensions, ActivityIndicator, SafeAreaView, ScrollView, Button, Text, View, FlatList, Image } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { useState, useEffect } from "react";

// icones
import { AntDesign } from '@expo/vector-icons';

//import des components
import Offers from "../components/Offers";


export default function HomeScreen({ navigation }) {
  // const navigation = useNavigation();  // ou faire passer { navigation } en props
  console.log(navigation);

  //! STATE 
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { height, width } = useWindowDimensions();


  // La callback de mon useEffect va être appelée une seule fois au premier rendu de mon composant
  useEffect(() => {
    console.log("---- useEffect executed ---- (*＾▽＾)／ ");

    const fetchOffers = async () => {
      try {
        const response = await axios.get("https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms");
        // console.log(response);
        // console.log(response.data.price);
        if (response.data) {
          // console.log(response.data);
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        // console.log(error.response.data);
        console.log(error.response);
      }
    }

    fetchOffers();
  }, []); // si [] vide s'execute qu'une seule fois


  const rating = (ratingValue) => {
    const str = [];    // str += "*";  <-- fonctionne pas avec les icones
    // for (let i = 0; i <= ratingValue; i++) {
    // for (let j = 1; j <= ratingValue - i; j++) {

    //   str.push(<AntDesign name="star" size={22} color="orange" />);
    // }
    // for (let j = 5; j > ratingValue - i; j--) {
    //   str.push(<AntDesign name="star" size={22} color="grey" />);
    // }
    //! */ mieux ainsi :
    for (let i = 0; i < 5; i++) {
      if (i < ratingValue) {
        str.push(<AntDesign name="star" size={22} color="orange" key={i} />);
      } else {
        str.push(<AntDesign name="star" size={22} color="grey" key={i} />);
      }
    }
    return str;
  }

  const dataSeparator = () => {
    return (
      <View
        // style={myStyles.dataSeparator}
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#aeaeae",
        }}
      />
    );
  }

  return isLoading ? (
    <View>
      <ActivityIndicator size="large" color="#0000ff"
        style={{ marginTop: 200, }} />
    </View>
  ) : (
    <SafeAreaView>
      <ScrollView
        style={{
          marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
        }}
      >
        <View>

          <Button
            title="Go to Profile"
            onPress={() => {
              navigation.navigate("Profile", { userId: 123 });
            }}
          />
        </View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          {/* <Button
            title="Test requete"
            onPress={handleOffers}
          /> */}
        </View>

      </ScrollView >

      <View>
        <FlatList
          data={data}
          // extraData={selectedId}
          ItemSeparatorComponent={dataSeparator}
          refreshing={true}
          keyExtractor={item => String(item._id)}
          renderItem={({ item }) => {
            return (

              <TouchableOpacity
                style={{ marginBottom: 30, alignItems: "center" }}
                onPress={() => {
                  navigation.navigate("Room", {
                    roomId: item._id,
                  });
                }}
              >
                <Image
                  source={{ uri: item.photos[0].url }}
                  style={{ width: width, height: 250 }}
                />

                <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.title}</Text>

                <Text style={{ color: "white", backgroundColor: "black" }}>{item.price} €</Text>
                {/* <Text>rating: {rating(item.ratingValue)} </Text> */}

                <View>
                  <Text>  {item.ratingValue} étoiles</Text>
                  <Text>{rating(item.ratingValue)}</Text>

                </View>

                <Text>{item.reviews} reviews</Text>
                <View style={{ alignItems: "flex-end" }}>

                  <Image
                    source={{ uri: item.user.account.photo.url }}
                    style={{ width: 50, height: 50, borderRadius: 50, margin: 10, }} />
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </SafeAreaView >
  );
}
