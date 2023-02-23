import React from 'react';
import { useNavigation } from "@react-navigation/core";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Button, Text, View, Image } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { useState, useEffect } from "react";

// pour le carrousel
import Swiper from "react-native-swiper";
// import { SwiperFlatList } from 'react-native-swiper-flatlist';

// pour la map et la géolocalisation
import MapView, { Marker } from "react-native-maps"; //PROVIDER_GOOGLE,
{/* <a target="_blank" href="https://icons8.com/icon/41445/epingle-de-carte">Epingle de carte</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */ }
// import * as Location from "expo-location";

export default function RoomScreen({ route }) {
    const navigation = useNavigation();  // ou faire passer { navigation } en props
    const roomId = route.params.roomId;

    console.log(navigation);
    console.log(route);

    //! STATE 
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [latitude, setLatidude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [coords, setCoords] = useState();


    useEffect(() => {
        console.log("---- useEffect executed ---- (*＾▽＾)／ ");
        const OffersById = async () => {
            try {
                const response = await axios.get(
                    `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${roomId}`);
                // if (response.data) {
                // console.log(response.data);
                setData(response.data);
                setIsLoading(false);
                // }

            } catch (error) {
                // console.log(error.response.data);
                console.log(error);
            }
        }
        OffersById();

    }, []);


    //! pour la map

    const askPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status);
    }

    const testMarkers = [
        {
            id: 1,
            latitude: 48.8564449,
            longitude: 2.4002913,
            title: "Le Reacteur",
            description: "La formation des champion·ne·s !"
        }
    ];



    return isLoading === true ? (
        <View>
            <ActivityIndicator size="large" color="salmon"
                style={{ marginTop: 200, }} />
        </View>
    ) : (
        <SafeAreaView>
            <ScrollView
                style={{
                    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
                }}
            >
            </ScrollView>
            <ScrollView>
                <View>

                    <Swiper
                        style={styles.wrapper}
                        dotColor="salmon"
                        activeDotColor="red"
                        autoplay
                    >
                        {data.photos.map((slide, i) => {
                            return (
                                <View key={{ i }} style={styles.slide}>
                                    {/*  */}
                                    <Image
                                        source={{ uri: slide.url }}
                                        style={{ height: "100%", width: "100%" }}
                                    />
                                </View>
                            );
                        })}
                    </Swiper>

                    <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 15 }}>{data.title}</Text>
                    <Text>{data.description}</Text>

                </View>

                {/*  !granted ? <Text> autorisation indispensabl </Text> */}
                <View style={{ flex: 1, backgroundColor: "pink", alignItems: "center", justifyContent: "center" }}>
                    <MapView
                        // La MapView doit obligatoirement avoir des dimensions
                        style={{ height: 350, width: "100%" }}
                        initialRegion={{
                            latitude: 43.597473,
                            longitude: 1.44438,
                            // latitude: { latitude },
                            // longitude: { longitude },
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05
                        }}
                        showsUserLocation={true}
                    // provider={PROVIDER_GOOGLE} ça plante
                    >
                        {testMarkers.map(marker => {
                            return (
                                <Marker
                                    key={marker.latitude}
                                    coordinate={{
                                        latitude: marker.latitude,
                                        longitude: marker.longitude
                                    }}
                                    // image={require("../assets/epingle.png")}  elle est trop petite !
                                    title={marker.title}
                                    description={marker.description}
                                />
                            )
                        })}





                    </MapView>
                </View>
            </ScrollView>
        </SafeAreaView>


    )




}

const styles = StyleSheet.create({
    wrapper: {
        height: 300,
    },
    slide: {
        height: 300,
    },
});
