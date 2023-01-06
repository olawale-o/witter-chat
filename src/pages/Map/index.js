import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import useDeepCompareEffect from 'use-deep-compare-effect'

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
  // const center = { lat: -34.397, lng: 150.644 };
  const [clicks, setClicks] = React.useState([]);
  const [zoom, setZoom] = React.useState(3);
  const [center, setCenter] = React.useState({
    lat: 0,
    lng: 0,
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
          />);
      default:
        return null;
    }
  };
  return (
    <Wrapper apiKey="" render={render} />
  );
};

export default Map;
