// import React from "react";
import { Input, Box, Heading, Stack, Container } from "@chakra-ui/react";
import ServiceInqiry from "./ServiceInqiry";

const MeetingDetail = () => {
  return (
    <>
      <Container maxW="100%" py={8} px={0}>
        <Box
          p={8}
          boxShadow="md"
          borderRadius="lg"
          bg="white"
          border="1px"
          borderColor="gray.200"
          w="100%" // Stretching to fill the container width
        >
          <Stack spacing={6} align="center">
            <Heading as="h2" size="lg" color="teal.600">
              Meeting Details
            </Heading>

            <Input
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
              focusBorderColor="teal.400"
              borderRadius="md"
              w="100%"
            />
          </Stack>
        </Box>
      </Container>
      <ServiceInqiry />
    </>
  );
};

export default MeetingDetail;
