import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
export default function SignInScreen({ setToken, navigation }) {


  // const navigation = useNavigation();

  //! STATE
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  return (
    <KeyboardAwareScrollView>
      <View>
        <View>
          <Text>Name: </Text>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={(txt) => {
              setUsername(txt);
            }}
          />
          <Text>Password: </Text>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(txt) => {
              setPassword(txt);
            }} />


          <Button
            title="Sign in"
            onPress={async () => {
              const userToken = "secret-token";
              
              if (username !== "" && password !== "") {
                alert("you are logged");
                setToken(userToken);
              } else {
                alert("missing parameters");
              }
            }}
          />



          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>No account ? Register</Text>
          </TouchableOpacity>

        </View>
      </View>
    </KeyboardAwareScrollView>);
}
