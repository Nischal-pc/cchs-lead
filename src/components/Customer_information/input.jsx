import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Input,
  FormControl,
  FormLabel,
  HStack,
  FormHelperText,
  FormErrorMessage,
  InputGroup,
  Button,
} from "@chakra-ui/react";
import { PageContext } from "../../context/context";

// Validation Schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email address is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]*$/, "Mobile number must be only digits")
    .min(10, "Phone number must be exactly 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .required("Mobile number is required"),
  homeNumber: Yup.string()
    .matches(/^[0-9]*$/, "Home number must be only digits")
    .notRequired(),
});

function NameInput() {
  const { page, setPage, data, setData } = useContext(PageContext);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Populate the form with customer data when the component mounts
  useEffect(() => {
    if (data.customer) {
      setValue("firstName", data.customer.firstName || "");
      setValue("lastName", data.customer.lastName || "");
      setValue("email", data.customer.email || "");
      setValue("phoneNumber", data.customer.phoneNumber || "");
      setValue("homeNumber", data.customer.homeNumber || "");
    }
  }, [data.customer, setValue]);

  // Handle the "Next" button click
  const onSubmit = (formData) => {
    // Save the customer data in the context
    setData((prevData) => ({
      ...prevData,
      customer: {
        ...prevData.customer,
        ...formData,
      },
    }));
    setPage(3); // Proceed to the next step
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="first_lastname">
          <HStack spacing={4} align="stretch">
            <FormControl isInvalid={!!errors.firstName}>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    {...field}
                  />
                )}
              />
              <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.lastName}>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    {...field}
                  />
                )}
              />
              <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>
          </HStack>
        </div>
        <div className="email_wrapper">
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email Address</FormLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input type="email" placeholder="Enter your email" {...field} />
              )}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            {!errors.email && (
              <FormHelperText>Your email won't be shared.</FormHelperText>
            )}
          </FormControl>
        </div>
        <div className="phonenum_wrapper">
          <HStack spacing={4} align="stretch">
            <FormControl isInvalid={!!errors.phoneNumber}>
              <FormLabel htmlFor="phoneNumber">Mobile</FormLabel>
              <InputGroup>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Enter your mobile number"
                      {...field}
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.phoneNumber?.message}
                </FormErrorMessage>
              </InputGroup>
            </FormControl>

            <FormControl isInvalid={!!errors.homeNumber}>
              <FormLabel htmlFor="homeNumber">Home Phone</FormLabel>
              <InputGroup>
                <Controller
                  name="homeNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="homeNumber"
                      type="tel"
                      placeholder="Enter your home phone"
                      {...field}
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.homeNumber?.message}
                </FormErrorMessage>
              </InputGroup>
            </FormControl>
          </HStack>
        </div>
        <div className="next_previousbutton">
          <HStack spacing={5} align="stretch" w="100%">
            <Button
              w="100%"
              h="32px"
              mt="20px"
              colorScheme="blue"
              onClick={() => {
                setPage(1); // Go back to the previous page
              }}
            >
              Previous
            </Button>
            <Button
              type="submit"
              w="100%"
              h="32px"
              mt="20px"
              colorScheme="blue"
            >
              Next
            </Button>
          </HStack>
        </div>
      </form>
    </div>
  );
}

export default NameInput;
