import { PageContext } from "../../context/context";
import { useContext, useEffect, useRef } from "react";
import { Input, FormControl, FormLabel, Grid, GridItem, Text} from "@chakra-ui/react";

function AddressForm({ errors }) {
  console.log(errors)
  const { data, setData } = useContext(PageContext);
  const inputRef = useRef(null);
  useEffect(() => {
    if (window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['geocode'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const address = {
          street: '',
          city: '',
          province: '',
          postalCode: '',
          country: ''
        };
        place.address_components.forEach(component => {
            const types = component.types;
            if (types.includes("street_number")) {
              address.street = component.long_name;
            }
            if (types.includes("route")) {
              address.street += ' ' + component.long_name;
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
        setData(data => ({...data, address: address}));
      });
    }
  }, [setData]);

  return (
    <div>
      <div className="address_section" style={{width: "100%"}}>
        <FormLabel fontWeight="bold" fontSize="lg" py={2}>
          Address Information
        </FormLabel>
        <Grid gridTemplateColumns={'1fr 1fr 1fr'} gap={2}>
          <GridItem colSpan={3}>
            <FormControl py={2} isInvalid={!!errors?.address?.street}>
              <FormLabel htmlFor="fullAddress">Full Address</FormLabel>
              <Input
                id="fullAddress"
                name="fullAddress"
                value={data.address.fullAddress}
                placeholder="Enter full address"
                ref={inputRef}
                onChange={(e) =>
                  setData(data => ({
                    ...data,
                    address: {...data.address, fullAddress: e.target.value}
                  }))
                }
              />
              {errors.address?.street && (
                <Text color="red.500" mt={1}>
                  {errors.address.street}
                </Text>
              )}
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl py={2}>
              <FormLabel htmlFor="street">Street</FormLabel>
              <Input
                id="street"
                name="street"
                value={data.address.street}
                readOnly
                placeholder="Street"
              />
            </FormControl>
            </GridItem>
            <FormControl py={2}>
              <FormLabel htmlFor="city">City</FormLabel>
              <Input
                id="city"
                name="city"
                value={data.address.city}
                readOnly
                placeholder="City"
              />
            </FormControl>
          <FormControl py={2}>
            <FormLabel htmlFor="province">Province</FormLabel>
            <Input
              id="province"
              name="province"
              value={data.address.province}
              readOnly
              placeholder="Province"
            />
          </FormControl>
          <FormControl py={2}>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Input
              id="country"
              name="country"
              value={data.address.country}
              readOnly
              placeholder="Country"
            />
          </FormControl>
          <FormControl py={2}>
            <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
            <Input
              id="postalCode"
              name="postalCode"
              value={data.address.postalCode}
              readOnly
              placeholder="Postal code"
            />
          </FormControl>
        </Grid>
      </div>
    </div>
  );
}

export default AddressForm;
