import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { PageContext } from "../../context/context";

// Validation Schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format") // Specify the error message for invalid format
    .nullable(),
  mobile: Yup.string()
    .matches(/^[0-9]*$/, "Mobile number must be only digits")
    .min(10, "Phone number must be exactly 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .required("Mobile number is required"),
  home: Yup.string()
    .matches(/^[0-9]*$/, "Home number must be only digits")
    .notRequired(),
});

function NameInput() {
  const { setPage, data, setData } = useContext(PageContext);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  useEffect(() => {
    if (data.customer) {
      setValue("firstName", data.customer.firstName || "");
      setValue("lastName", data.customer.lastName || "");
      setValue("email", data.customer.email || "");
      setValue("mobile", data.customer.mobile || "");
      setValue("home", data.customer.home || "");
    }
  }, [data.customer, setValue]);

  const onSubmit = (formData) => {
    setData((prevData) => ({
      ...prevData,
      customer: {
        ...prevData.customer,
        ...formData,
      },
    }));
    setPage(3);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="first_lastname">
          <HStack spacing={4} align="stretch" py={2}>
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
          <FormControl isInvalid={!!errors.email} py={2}>
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
              <FormHelperText textAlign={"left"}>
                Your email will not be shared.
              </FormHelperText>
            )}
          </FormControl>
        </div>
        <div className="phonenum_wrapper">
          <HStack spacing={4} align="stretch" py={2}>
            <FormControl isInvalid={!!errors.mobile}>
              <FormLabel htmlFor="mobile">Mobile</FormLabel>
              <InputGroup>
                <Controller
                  name="mobile"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter your mobile number"
                      {...field}
                    />
                  )}
                />
              </InputGroup>
              <FormErrorMessage>{errors.mobile?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.home}>
              <FormLabel htmlFor="home">Home Phone</FormLabel>
              <InputGroup>
                <Controller
                  name="home"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="home"
                      type="tel"
                      placeholder="Enter your home phone"
                      {...field}
                    />
                  )}
                />
                <FormErrorMessage>{errors.home?.message}</FormErrorMessage>
              </InputGroup>
            </FormControl>
          </HStack>
        </div>
        <div className="next_previousbutton">
          <HStack spacing={5} align="stretch" w="100%">
            <Button
              w="100%"
              mt="20px"
              colorScheme="blue"
              onClick={() => {
                setPage(1);
              }}
            >
              Previous
            </Button>
            <Button type="submit" w="100%" mt="20px" colorScheme="blue">
              Next
            </Button>
          </HStack>
        </div>
      </form>
    </div>
  );
}

export default NameInput;
