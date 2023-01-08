import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import useDeepCompareEffect from 'use-deep-compare-effect'

const Marker = (options) => {
  const [marker, setMarker] = React.useState();
  
  React.useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }
    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);
  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);
  return null;
};

const Spinner = () => {
  return (<div>Spinner</div>)
};

const ErrorComponent = () => {
  return (<div>ErrorComponent</div>)
};

function MyMapComponent({ center, zoom, onClick, onIdle, children, ...options}) {
  const ref = React.useRef();
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        center,
        zoom,
      }))
    }
  }, [center, zoom, ref, map]);

  useDeepCompareEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        window.google.maps.event.clearListeners(map, eventName)
      );
      if (onClick) {
        map.addListener("click", onClick);
      }
  
      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);
  
  return (
    <>
        <div ref={ref} id="map" />
        {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
            // set the map prop on the child component
            // @ts-ignore
            return React.cloneElement(child, { map });
        }
        })}
    </>
  );
}

const Map = () => {
  const [clicks, setClicks] = React.useState([]);
  const [zoom, setZoom] = React.useState(13);
  const [center, setCenter] = React.useState({
    lat: 6.6018,
    lng: 3.3515,
  });

  const onClick = (e) => {
    console.log(e);
    setClicks([...clicks, e.latLng])
  };

  const onIdle = (m) => {
    console.log("onIdle");
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
        const crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        setCenter((center) => ({ ...center , lat: crd.latitude, lng: crd.longitude }))
    }, (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    } );
  }, []);
  
  const render = (status) => {
    switch (status) {
      case Status.LOADING:
        return <Spinner />;
      case Status.FAILURE:
        return <ErrorComponent />;
      case Status.SUCCESS:
        return (
          <MyMapComponent
            center={center} zoom={zoom}
            onClick={onClick}
            onIdle={onIdle}
            mapTypeControlOptions={{
                mapTypeIds: ['roadmap', 'terrain']
             }}
             mapTypeId={'terrain'}
          >
            <Marker
              position={{ lat: center.lat, lng: center.lng }}
              title="my location"
              optimize={true}
            />
          </MyMapComponent>);
      default:
        return null;
    }
  };

  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY} render={render} />
  );
};

export default Map;
