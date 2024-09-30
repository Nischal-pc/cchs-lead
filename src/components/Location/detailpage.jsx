// import React, { useState, useEffect } from "react";
// import { Input, FormControl, FormLabel, HStack } from "@chakra-ui/react";
// import MeetingDetail from "./MeetingDetail"; // Assuming you have another component for meeting details

// function DetailPage() {
//   const [addressInfo, setAddressInfo] = useState({
//     fullAddress: "",
//     street: "",
//     city: "",
//     province: "",
//     country: "",
//     postalCode: "",
//   });

//   // Load the Google Maps Places API script
//   useEffect(() => {
//     const loadScript = (src) => {
//       return new Promise((resolve) => {
//         const script = document.createElement("script");
//         script.src = src;
//         script.onload = () => resolve();
//         document.body.appendChild(script);
//       });
//     };

//     loadScript(
//       `https://maps.googleapis.com/maps/api/js?key=AIzaSyCOEbzx7xbi72TM_g8gRfIxovJGf0-4m-0&libraries=places`
//     ).then(() => {
//       const input = document.getElementById("fullAddress");
//       const autocomplete = new window.google.maps.places.Autocomplete(input);

//       autocomplete.addListener("place_changed", () => {
//         const place = autocomplete.getPlace();
//         populateAddressFields(place);
//       });
//     });
//   }, []);

//   const populateAddressFields = (place) => {
//     const addressComponents = place.address_components;

//     // Extract the relevant fields from the address components
//     const street =
//       addressComponents.find((component) => component.types.includes("route"))
//         ?.long_name || "";
//     const city =
//       addressComponents.find((component) =>
//         component.types.includes("locality")
//       )?.long_name || "";
//     const province =
//       addressComponents.find((component) =>
//         component.types.includes("administrative_area_level_1")
//       )?.long_name || "";
//     const country =
//       addressComponents.find((component) => component.types.includes("country"))
//         ?.long_name || "";
//     const postalCode =
//       addressComponents.find((component) =>
//         component.types.includes("postal_code")
//       )?.long_name || "";

//     // Concatenate address components without commas for the full address
//     const fullAddress =
//       `${street} ${city} ${province} ${country} ${postalCode}`.trim();

//     // Update state with the extracted details
//     setAddressInfo((prevState) => ({
//       ...prevState,
//       fullAddress, // Update full address without commas
//       street,
//       city,
//       province,
//       country,
//       postalCode,
//     }));
//   };

//   return (
//     <div>
//       {/* Address Section */}
//       <div className="address_section">
//         <FormControl>
//           <FormLabel htmlFor="fullAddress">Full Address</FormLabel>
//           <Input
//             id="fullAddress"
//             name="fullAddress"
//             value={addressInfo.fullAddress}
//             placeholder="Enter full address"
//             onChange={(e) =>
//               setAddressInfo({ ...addressInfo, fullAddress: e.target.value })
//             }
//           />
//         </FormControl>
//         <HStack spacing={4}>
//           <FormControl>
//             <FormLabel htmlFor="street">Street</FormLabel>
//             <Input
//               id="street"
//               name="street"
//               value={addressInfo.street}
//               readOnly // Make this read-only since it is populated automatically
//               placeholder="Street"
//             />
//           </FormControl>

//           <FormControl>
//             <FormLabel htmlFor="city">City</FormLabel>
//             <Input
//               id="city"
//               name="city"
//               value={addressInfo.city}
//               readOnly // Make this read-only since it is populated automatically
//               placeholder="City"
//             />
//           </FormControl>
//         </HStack>
//         <HStack spacing={4}>
//           <FormControl>
//             <FormLabel htmlFor="province">Province</FormLabel>
//             <Input
//               id="province"
//               name="province"
//               value={addressInfo.province}
//               readOnly // Make this read-only since it is populated automatically
//               placeholder="Province"
//             />
//           </FormControl>

//           <FormControl>
//             <FormLabel htmlFor="country">Country</FormLabel>
//             <Input
//               id="country"
//               name="country"
//               value={addressInfo.country}
//               readOnly // Make this read-only since it is populated automatically
//               placeholder="Country"
//             />
//           </FormControl>

//           <FormControl>
//             <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
//             <Input
//               id="postalCode"
//               name="postalCode"
//               value={addressInfo.postalCode}
//               readOnly // Make this read-only since it is populated automatically
//               placeholder="Postal code"
//             />
//           </FormControl>
//         </HStack>
//         <MeetingDetail />
//       </div>
//     </div>
//   );
// }

// export default DetailPage;
import React, { useState, useEffect, useContext } from "react";
import { Input, FormControl, FormLabel, HStack } from "@chakra-ui/react";
import MeetingDetail from "./MeetingDetail"; // Assuming you have another component for meeting details

import { PageContext } from "../../context/context";

function DetailPage() {
  const { data, setData } = useContext(PageContext); // Use the context
  const [addressInfo, setAddressInfo] = useState({
    fullAddress: "",
    street: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
  });

  // Load the Google Maps Places API script
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyCOEbzx7xbi72TM_g8gRfIxovJGf0-4m-0&libraries=places`
    ).then(() => {
      const input = document.getElementById("fullAddress");
      const autocomplete = new window.google.maps.places.Autocomplete(input);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        populateAddressFields(place);
      });
    });
  }, []);

  const populateAddressFields = (place) => {
    const addressComponents = place.address_components;

    // Extract the relevant fields from the address components
    const street =
      addressComponents.find((component) => component.types.includes("route"))
        ?.long_name || "";
    const city =
      addressComponents.find((component) =>
        component.types.includes("locality")
      )?.long_name || "";
    const province =
      addressComponents.find((component) =>
        component.types.includes("administrative_area_level_1")
      )?.long_name || "";
    const country =
      addressComponents.find((component) => component.types.includes("country"))
        ?.long_name || "";
    const postalCode =
      addressComponents.find((component) =>
        component.types.includes("postal_code")
      )?.long_name || "";

    // Concatenate address components without commas for the full address
    const fullAddress =
      `${street} ${city} ${province} ${country} ${postalCode}`.trim();

    // Update state with the extracted details
    setAddressInfo((prevState) => ({
      ...prevState,
      fullAddress, // Update full address without commas
      street,
      city,
      province,
      country,
      postalCode,
    }));

    // Update the location in the context
    setData((prevData) => ({
      ...prevData,
      location: {
        fullAddress,
        street,
        city,
        province,
        country,
        postalCode,
      },
    }));
  };

  return (
    <div>
      {/* Address Section */}
      <div className="address_section">
        <FormControl>
          <FormLabel htmlFor="fullAddress">Full Address</FormLabel>
          <Input
            id="fullAddress"
            name="fullAddress"
            value={addressInfo.fullAddress}
            placeholder="Enter full address"
            onChange={(e) =>
              setAddressInfo({ ...addressInfo, fullAddress: e.target.value })
            }
          />
        </FormControl>
        <HStack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="street">Street</FormLabel>
            <Input
              id="street"
              name="street"
              value={addressInfo.street}
              readOnly // Make this read-only since it is populated automatically
              placeholder="Street"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input
              id="city"
              name="city"
              value={addressInfo.city}
              readOnly // Make this read-only since it is populated automatically
              placeholder="City"
            />
          </FormControl>
        </HStack>
        <HStack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="province">Province</FormLabel>
            <Input
              id="province"
              name="province"
              value={addressInfo.province}
              readOnly // Make this read-only since it is populated automatically
              placeholder="Province"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Input
              id="country"
              name="country"
              value={addressInfo.country}
              readOnly // Make this read-only since it is populated automatically
              placeholder="Country"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
            <Input
              id="postalCode"
              name="postalCode"
              value={addressInfo.postalCode}
              readOnly // Make this read-only since it is populated automatically
              placeholder="Postal code"
            />
          </FormControl>
        </HStack>
        <MeetingDetail />
      </div>
    </div>
  );
}

export default DetailPage;
