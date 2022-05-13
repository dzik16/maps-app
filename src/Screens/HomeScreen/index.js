// /* eslint-disable no-unused-vars */
// import {StyleSheet, View} from 'react-native';
// import React, {useEffect} from 'react';
// import messaging from '@react-native-firebase/messaging';

// import CrashlyticsScreen from './Screens/CrashlyticsScreen/index.js';
// import AnalyticsScreen from './Screens/AnalyticsScreen';
// import MapsScreen from './Screens/MapsScreen';
// import QrCodeScreen from './Screens/QrCodeScreen/index.js';
// import BiometricScreen from './Screens/BiometricScreen/index.js';
// import LoginScreen from './Screens/LoginScreen';
// import RegisterScreen from './Screens/RegisterScreen';

// const HomeScreen = () => {
//   async function requestUserPermission() {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//     }
//   }

//   const getToken = async () => {
//     const token = await messaging().getToken();
//     console.log(JSON.stringify(token));
//   };

//   useEffect(() => {
//     requestUserPermission();
//     getToken();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* <CrashlyticsScreen />
//       <AnalyticsScreen /> */}
//       {/* <MapsScreen /> */}
//       {/* <QrCodeScreen /> */}
//       {/* <BiometricScreen /> */}
//       {/* <LoginScreen /> */}
//       {/* <RegisterScreen /> */}
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   // container: {
//   //   // ...StyleSheet.absoluteFillObject,
//   //   flex: 1, //the container will fill the whole screen.
//   //   // justifyContent: 'flex-end',
//   //   // alignItems: 'center',
//   // },
// });

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { LogoutImage, CrashlyticImage, AnalyticsImage, MapsImage } from '../../Assets/index.js';
import analytics from '@react-native-firebase/analytics';

import BiometricScreen from '../BiometricScreen/index.js';


const HomeScreen = () => {
  const navigation = useNavigation();

  async function onGoogleSignOut() {
    return await auth().signOut();
  }

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => {
          alert('Your are signed out!')
        });
      // setUser(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      {/* <Text>index</Text>
      <BiometricScreen />
      <Button
        title="Sign-Out"
        onPress={() =>
          onGoogleSignOut().then(() => {
            signOut();
            console.log('Signed Out');
            navigation.navigate('LoginScreen');
          })
        }
      /> */}
      <Text style={styles.judul}>Welcome To Maps App</Text>

      <View style={[styles.gridContainer]}>
        <TouchableOpacity style={[styles.grid, styles.analytic]}
          onPress={async () =>
            await analytics().logEvent('basket', {
              id: 3745092,
              item: 'mens grey t-shirt',
              description: ['round neck', 'long sleeved'],
              size: 'L',
            })
          }>
          <Image
            style={styles.img}
            source={AnalyticsImage}
          />
          <Text style={styles.txt}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.grid, styles.crash]}
          onPress={() => navigation.navigate('CrashlyticsScreen')}>
          <Image
            style={styles.img}
            source={CrashlyticImage}
          />
          <Text style={styles.txt}>Crashlytic</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gridContainer}>
        <TouchableOpacity style={[styles.grid, styles.maps]}
          onPress={() => navigation.navigate('MapsScreen')}>
          <Image
            style={styles.img}
            source={MapsImage}
          />
          <Text style={styles.txt}>Maps</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.grid, styles.logout]}
          onPress={() =>
            onGoogleSignOut().then(() => {
              signOut();
              console.log('Signed Out');
              navigation.replace('LoginScreen');
            })
          }
        >
          <Image
            style={styles.img}
            source={LogoutImage}
          />
          <Text style={styles.txt}>Logout</Text>
        </TouchableOpacity>
      </View>

    </View >
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    backgroundColor: "#79B4B7"
  },
  judul: {
    fontSize: 30,
    alignSelf: "center",
    color: 'white',
    fontWeight: "bold",
    marginTop: 30
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 35
  },
  grid: {
    backgroundColor: 'cyan',
    width: 160,
    height: 200,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  img: {
    width: 130,
    height: 130,
    alignSelf: "center",
  },
  txt: {
    alignSelf: "center",
    fontSize: 20,
    color: 'white',
    fontWeight: "bold",
    marginTop: 12
  },
  analytic: {
    backgroundColor: "#99BBAD",
  },
  crash: {
    backgroundColor: "#D77FA1"
  },
  maps: {
    backgroundColor: "#FFB2A6"
  },
  logout: {
    backgroundColor: "#92BA92"
  }
})