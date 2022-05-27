export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoidmlkZW90ZWNoZHVkZSIsImEiOiJjbDNjYWhtd2gwMXo3M2Rva3NxZDYyMHB3In0.mUr860LLA0EdChiu-LP8AA';

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/videotechdude/cl3d4mvtx000v14my1auh6wlv', // style URL
    scrollZoom: false,
    //   center: locations[0].coordinates,
    //   zoom: 10,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    // Extends map bounds
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
