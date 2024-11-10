import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapComponent() {
  const [LeafletMap, setLeafletMap] = useState(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      import('react-leaflet').then((Leaflet) => {
        const { MapContainer, TileLayer, Marker, Popup } = Leaflet;
        
        // Define the LeafletMap component with dynamically imported components
        const DynamicLeafletMap = () => (
          <MapContainer
            center={[37.78825, -122.4324]}  // Set initial center position for map
            zoom={13}  // Set zoom level
            style={{ height: '100%', width: '100%' }}  // Make map take full width and height
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[37.78825, -122.4324]}>
              <Popup>Your Location</Popup>
            </Marker>
          </MapContainer>
        );

        // Set the dynamic map as the state
        setLeafletMap(() => DynamicLeafletMap);
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        LeafletMap ? (
          <LeafletMap />  // Render map if loaded
        ) : (
          <Text>Loading map...</Text>  // Placeholder while LeafletMap is loading
        )
      ) : (
        <WebView
          originWhitelist={['*']}
          source={{
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" />
                <style> #map { width: 100%; height: 100%; } </style>  <!-- Ensure map takes full size -->
              </head>
              <body>
                <div id="map"></div>  <!-- This div holds the map -->
                <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>
                <script>
                  var map = L.map('map').setView([37.78825, -122.4324], 13);  // Set map center and zoom
                  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; OpenStreetMap contributors'
                  }).addTo(map);
                  L.marker([37.78825, -122.4324]).addTo(map)
                    .bindPopup('Your Location')
                    .openPopup();
                </script>
              </body>
              </html>
            `,
          }}
          style={styles.map}  // Ensure WebView takes full height and width of the container
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Makes sure the container takes full space
  },
  map: {
    flex: 1,  // Ensures WebView takes up all space in the container
    width: '100%',  // Map should take up full width
    height: '100%',  // Map should take up full height
    overflow: 'hidden'
  },
});
