// import React from "react";
// import { PageContext } from "../../context/context";
// import { useContext } from "react";
// import {
//   Checkbox,
//   Wrap,
//   CheckboxGroup,
//   FormLabel,
//   Textarea,
//   Button,
//   HStack,
// } from "@chakra-ui/react";

// const ServiceInquiry = () => {
//   const { page, setPage } = useContext(PageContext);
//   const serviceOptions = [
//     "Tankless Water Heater",
//     "HVAC",
//     "Heat Pump",
//     "Air Conditioner (A/C)",
//     "Water Tank",
//     "Attic Insulation",
//     "Furnace",
//     "Water Softener",
//     "Hybrid Water Heater",
//     "Bathroom Renovation",
//     "Hybrid Heating System",
//     "Kitchen Renovation",
//     "Ducted Electric Heat Pump",
//     "Home Renovation",
//     "Rebate Consultation",
//     "Existing Customer Visit",
//   ];

//   return (
//     <div>
//       <FormLabel fontWeight="bold" fontSize="lg">
//         Service Inquiry
//       </FormLabel>
//       <CheckboxGroup colorScheme="green">
//         <Wrap spacing={4} justify="flex-start">
//           {serviceOptions.map((service, index) => (
//             <Checkbox key={index} value={service}>
//               {service}
//             </Checkbox>
//           ))}
//         </Wrap>
//       </CheckboxGroup>
//       <div style={{ marginTop: "20px" }}>
//         <FormLabel htmlFor="notes" fontWeight="bold" fontSize="lg">
//           Notes
//         </FormLabel>
//         <Textarea
//           id="notes"
//           rows={4}
//           placeholder="Enter any additional notes here..."
//           borderColor="gray.300" // Ensures the border color is always visible
//           _focus={{ borderColor: "green.500", boxShadow: "outline" }} // Changes border color on focus
//           _hover={{ borderColor: "gray.400" }} // Changes border color on hover
//         />
//       </div>
//       {/* <Button w="100%" h="32px" mt="20px" colorScheme="blue">
//         Submit
//       </Button> */}
//       <HStack spacing={5} align="stretch" w="100%">
//         {/* <Link to="/" style={{ flex: 1 }}></Link> */}
//         <Button
//           w="100%"
//           h="32px"
//           mt="20px"
//           colorScheme="blue"
//           onClick={() => setPage(() => 2)}
//         >
//           Previous
//         </Button>
//         {/* <Link to="/location" style={{ flex: 1 }}></Link> */}
//         <Button
//           w="100%"
//           h="32px"
//           mt="20px"
//           colorScheme="blue"
//           onClick={() => setPage(2)}
//         >
//           Submit
//         </Button>
//       </HStack>
//     </div>
//   );
// };

// export default ServiceInquiry;
import React, { useContext, useState } from "react";
import { PageContext } from "../../context/context";
import {
  Checkbox,
  Wrap,
  CheckboxGroup,
  FormLabel,
  Textarea,
  Button,
  HStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const ServiceInquiry = () => {
  const { page, setPage, data } = useContext(PageContext);
  const [selectedServices, setSelectedServices] = useState([]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const serviceOptions = [
    "Tankless Water Heater",
    "HVAC",
    "Heat Pump",
    "Air Conditioner (A/C)",
    "Water Tank",
    "Attic Insulation",
    "Furnace",
    "Water Softener",
    "Hybrid Water Heater",
    "Bathroom Renovation",
    "Hybrid Heating System",
    "Kitchen Renovation",
    "Ducted Electric Heat Pump",
    "Home Renovation",
    "Rebate Consultation",
    "Existing Customer Visit",
  ];

  const handleSubmit = () => {
    // Validate address fields
    const { location } = data; // Access the location object from context

    // Check if location fields are filled
    if (
      !location.fullAddress ||
      !location.street ||
      !location.city ||
      !location.province ||
      !location.country ||
      !location.postalCode
    ) {
      setError("Please fill in all address fields.");
      return;
    }

    // Check if at least one service is selected
    if (selectedServices.length === 0) {
      setError("Please select at least one service.");
      return;
    }

    // Optional: Check notes (if required)
    // if (notes.trim().length === 0) {
    //   setError("Please enter additional notes.");
    //   return;
    // }

    // If all validations pass, clear error and proceed
    setError("");
    // setPage(2); // Navigate to the next page
  };

  return (
    <form>
      <div>
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}

        <FormLabel fontWeight="bold" fontSize="lg">
          Service Inquiry
        </FormLabel>
        <CheckboxGroup colorScheme="green" onChange={setSelectedServices}>
          <Wrap spacing={4} justify="flex-start">
            {serviceOptions.map((service, index) => (
              <Checkbox key={index} value={service}>
                {service}
              </Checkbox>
            ))}
          </Wrap>
        </CheckboxGroup>

        <div style={{ marginTop: "20px" }}>
          <FormLabel htmlFor="notes" fontWeight="bold" fontSize="lg">
            Notes
          </FormLabel>
          <Textarea
            id="notes"
            rows={4}
            placeholder="Enter any additional notes here..."
            borderColor="gray.300"
            _focus={{ borderColor: "green.500", boxShadow: "outline" }}
            _hover={{ borderColor: "gray.400" }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <HStack spacing={5} align="stretch" w="100%">
          <Button
            w="100%"
            h="32px"
            mt="20px"
            colorScheme="blue"
            onClick={() => setPage(() => 2)}
          >
            Previous
          </Button>
          <Button
            w="100%"
            h="32px"
            mt="20px"
            colorScheme="blue"
            onClick={handleSubmit} // Call the handleSubmit function
          >
            Submit
          </Button>
        </HStack>
      </div>
    </form>
  );
};

export default ServiceInquiry;
