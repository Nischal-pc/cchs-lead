import { useContext, useEffect, useRef, useState } from "react";
import { PageContext } from "../../context/context";
// import ServiceInquiry from "./ServiceInqiry";
// import MeetingDetail from "./MeetingDetail";
// import AddressForm from "./addressForm";
import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import * as Yup from "yup";

function Location() {
  const { data, setPage, setData } = useContext(PageContext);
  const [errors, setErrors] = useState({});
  const inputRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  const schema = Yup.object().shape({
    address: Yup.object().shape({
      street: Yup.string().required("Street Address is required"),
      city: Yup.string().required("City is required"),
      province: Yup.string().required("Province is required"),
      postalCode: Yup.string().required("Postal Code is required"),
      country: Yup.string().required("Country is required"),
    }),
    lead: Yup.object().shape({
      source: Yup.string().required("Lead Source is required."),
      types: Yup.array()
        .of(Yup.string().required("Each type must be a string"))
        .required("Service enquiry is required")
        .min(1, "Service enquires must have at least one selected"),
    }),
    meetingTime: Yup.string().required("Meeting time must be selected"),
  });

  const validateData = async () => {
    try {
      await schema.validate(data, { abortEarly: false });
      setErrors(null);
      return data;
    } catch (validationError) {
      const validationErrors = validationError.inner.reduce((acc, err) => {
        const path = err.path.split(".");
        let current = acc;
        path.forEach((key, index) => {
          if (index === path.length - 1) {
            current[key] = err.message;
          } else {
            current[key] = current[key] || {};
            current = current[key];
          }
        });
        return acc;
      }, {});
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    if (window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["geocode"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const address = {
          street: "",
          city: "",
          province: "",
          postalCode: "",
          country: "",
        };
        place.address_components.forEach((component) => {
          const types = component.types;
          if (types.includes("street_number")) {
            address.street = component.long_name;
          }
          if (types.includes("route")) {
            address.street += " " + component.long_name;
          }
          if (types.includes("locality")) {
            address.city = component.long_name;
          }
          if (types.includes("administrative_area_level_1")) {
            address.province = component.short_name;
          }
          if (types.includes("postal_code")) {
            address.postalCode = component.long_name;
          }
          if (types.includes("country")) {
            address.country = component.long_name;
          }
          address.fullAddress = place.formatted_address;
        });
        setData((data) => ({ ...data, address: address }));
      });
    }
  }, [setData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await validateData();
    if (data) {
      const res = await fetch(
        "https://hooks.zapier.com/hooks/catch/7641205/2muw6xz/",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      if (result.status === "success") {
        onOpen();
      }
    }
  };

  const leadTypes = [
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

  return (
    <form>
      <Modal
        closeOnOverlayClick={false}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="green.500">
            <Text>
              {" "}
              <CheckIcon color={"green.500"} /> Lead Submission Success
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Lead submitted successfully! Click <b>Submit Another</b> to add a
            new lead or close this window.
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() => window.location.reload()}
            >
              Submit Another
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box
        py={10}
        minW={{ base: "md", md: "xl", xl: "3xl" }}
        maxW={{ base: "md", md: "xl", xl: "3xl" }}
        textAlign={"left"}
      >
        <div>
          <div className="address_section" style={{ width: "100%" }}>
            <FormLabel fontWeight="bold" fontSize="lg" py={2}>
              Address Information
            </FormLabel>
            <Grid gridTemplateColumns={"1fr 1fr 1fr"} gap={2}>
              <GridItem colSpan={3}>
                <FormControl py={2}>
                  <FormLabel htmlFor="fullAddress">Full Address</FormLabel>
                  <Input
                    id="fullAddress"
                    name="fullAddress"
                    value={data.address.fullAddress}
                    placeholder="Enter full address"
                    ref={inputRef}
                    onChange={(e) =>
                      setData((data) => ({
                        ...data,
                        address: {
                          ...data.address,
                          fullAddress: e.target.value,
                        },
                      }))
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl py={2} isInvalid={!!errors?.address?.street}>
                  <FormLabel htmlFor="street">Street</FormLabel>
                  <Input
                    id="street"
                    name="street"
                    value={data.address.street}
                    readOnly
                    placeholder="Street"
                  />
                  {errors?.address?.street && (
                    <FormErrorMessage>
                      {errors?.address.street}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </GridItem>
              <FormControl py={2} isInvalid={!!errors?.address?.city}>
                <FormLabel htmlFor="city">City</FormLabel>
                <Input
                  id="city"
                  name="city"
                  value={data.address.city}
                  readOnly
                  placeholder="City"
                />
                {errors?.address?.city && (
                  <FormErrorMessage>{errors.address.city}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl py={2} isInvalid={!!errors?.address?.province}>
                <FormLabel htmlFor="province">Province</FormLabel>
                <Input
                  id="province"
                  name="province"
                  value={data.address.province}
                  readOnly
                  placeholder="Province"
                />
                {errors?.address?.province && (
                  <FormErrorMessage>{errors.address.province}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl py={2} isInvalid={!!errors?.address?.country}>
                <FormLabel htmlFor="country">Country</FormLabel>
                <Input
                  id="country"
                  name="country"
                  value={data.address.country}
                  readOnly
                  placeholder="Country"
                />
                {errors?.address?.country && (
                  <FormErrorMessage>{errors.address.country}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl py={2} isInvalid={!!errors?.address?.postalCode}>
                <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={data.address.postalCode}
                  readOnly
                  placeholder="Postal code"
                />
                {errors?.address?.postalCode && (
                  <FormErrorMessage>
                    {errors.address.postalCode}
                  </FormErrorMessage>
                )}
              </FormControl>
            </Grid>
          </div>
        </div>
        {/* Meeting Details */}
        <div>
          <Box py={2}>
            <FormControl py={2} isInvalid={!!errors?.meetingTime}>
              <FormLabel fontWeight="bold" fontSize="lg" py={2}>
                Meeting Details
              </FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                focusBorderColor="teal.400"
                borderRadius="md"
                w="100%"
                value={data.meetingTime}
                onChange={(e) =>
                  setData({ ...data, meetingTime: e.target.value })
                }
              />
              {errors?.meetingTime && (
                <FormErrorMessage>{errors?.meetingTime}</FormErrorMessage>
              )}
            </FormControl>
          </Box>
        </div>
        {/* Service Enquiry Section */}
        <div>
          <FormLabel fontWeight="bold" fontSize="lg" py={2}>
            Service Inquiry
          </FormLabel>

          {/* <FormControl isInvalid={!!errors?.lead?.types}> */}
          <CheckboxGroup colorScheme="green">
            <Wrap spacing={4} justify="flex-start">
              {leadTypes.map((lead, index) => (
                <Checkbox
                  key={index}
                  isChecked={data.lead.types.includes(lead)}
                  onChange={(e) => {
                    const { checked } = e.target;
                    setData({
                      ...data,
                      lead: {
                        ...data.lead,
                        types: checked
                          ? [...data.lead.types, lead]
                          : data.lead.types.filter((type) => type !== lead),
                      },
                    });
                  }}
                >
                  {lead}
                </Checkbox>
              ))}
            </Wrap>
          </CheckboxGroup>
          {errors?.lead?.types && (
            <Text color={"red.400"} py={2}>
              {errors.lead.types}
            </Text>
          )}
          {/* </FormControl> */}

          <div>
            <FormLabel htmlFor="notes" fontWeight="bold" fontSize="lg" py={2}>
              Notes
            </FormLabel>
            <Textarea
              id="notes"
              rows={4}
              placeholder="Enter any additional notes here..."
              borderColor="gray.300"
              _focus={{ borderColor: "green.500", boxShadow: "outline" }}
              _hover={{ borderColor: "gray.400" }}
              value={data.notes}
              onChange={(e) => setData({ ...data, notes: e.target.value })}
            />
          </div>
        </div>
        <HStack spacing={5} align="stretch" w="100%">
          <Button
            w="100%"
            h="32px"
            mt="20px"
            colorScheme="blue"
            py={5}
            onClick={() => setPage(() => 2)}
          >
            Previous
          </Button>
          <Button
            w="100%"
            h="32px"
            mt="20px"
            colorScheme="blue"
            py={5}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </HStack>
      </Box>
    </form>
  );
}

export default Location;
