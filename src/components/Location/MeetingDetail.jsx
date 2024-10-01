import { Input, Box, FormLabel, Stack, Container } from "@chakra-ui/react";
import { useContext } from "react";
import { PageContext } from "../../context/context";

const MeetingDetail = () => {
  const {data, setData} = useContext(PageContext);
  
  return (
    <div>
      <Container maxW="100%" py={4} px={0}>
        <Box>
          <Stack spacing={2} align="left">
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
              onChange={e => setData({...data, meetingTime: e.target.value})}
            />
          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default MeetingDetail;
