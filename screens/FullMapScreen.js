// import React, { useState, useEffect, useCallback } from 'react';
// import { View, Text, StyleSheet,Platform, TouchableOpacity } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Colors from '../constants/Colors';

// const FullMapScreen = props => {
//   const [selectedLocation, setSelectedLocation] = useState();

//   const mapRegion = {
//     latitude: 37.78,
//     longitude: -122.43,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421
//   };

//     const savePickedLocationHandler = useCallback(() => {
//         if(!selectedLocation){
//             Alert.alert('You didnt choose place!', error, [{text: 'OK'}])
//             return;
//         }
//         console.log("Selected Loc: ",selectedLocation);
//         props.navigation.navigate('Map', {pickedLocation: selectedLocation});
//     }, [selectedLocation]);

//     useEffect(() =>{
//         props.navigation.setParams({ saveLocation: savePickedLocationHandler });
//     }, [savePickedLocationHandler]);

//   const selectLocationHandler = event => {
//     setSelectedLocation({
//       lat: event.nativeEvent.coordinate.latitude,
//       lng: event.nativeEvent.coordinate.longitude
//     });
//   };

//   let markerCoordinates;

//   if (selectedLocation) {
//     markerCoordinates = {
//       latitude: selectedLocation.lat,
//       longitude: selectedLocation.lng
//     };
//   }

//   return (
//     <MapView
//       style={styles.map}
//       region={mapRegion}
//       onPress={selectLocationHandler}
//     >
//       {markerCoordinates && (
//         <Marker title="Picked Location" coordinate={markerCoordinates} />
//       )}
//     </MapView>
//   );
// };


// export const fullMapOption = navData =>{
//   // console.log(navData.navigation.getParam('saveLocation'))

//   // const saveFn = navData.navigation.getParam('saveLocation');
//     return {
//         headerTitle: 'Map', 
//         headerRight: () => 
//           <TouchableOpacity style={styles.headerButton}>
//             <Text style={styles.headerButtonText}>Save</Text>
//           </TouchableOpacity> 
//     }
// }

// const styles = StyleSheet.create({
//   map: {
//     flex: 1
//   },
//   headerButton: {
//     marginHorizontal:20
//   },
//   headerButtonText: {
//     fontSize: 16, 
//     color: Platform.OS === 'android' ? 'white': Colors.primary
//   }

// });

// export default FullMapScreen;

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors';

const MapScreen = props => {
  // const initialLocation = props.navigation.getParam('initialLocation');
  // const readonly = props.navigation.getParam('readonly');

  const [selectedLocation, setSelectedLocation] = useState();

  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = event => {
    // if (readonly) {
    //   return;
    // }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  const savePickedLocationHandler = useCallback(() => {

    if (!selectedLocation) {
      // could show an alert!
      return;
    }
    props.navigation.navigate('Map', { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ savePickedLocationHandler: savePickedLocationHandler });
  }, [savePickedLocationHandler]);
  

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

export const fullMapOption = navData => {
  const saveFn = navData.route.params?.savePickedLocationHandler;
  return {
    headerRight: () => (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

export default MapScreen;
