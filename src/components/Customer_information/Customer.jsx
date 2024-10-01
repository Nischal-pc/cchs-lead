import NameInput from "./input";
import { Box } from "@chakra-ui/react";
function Customer() {
  return (
    <div>
      <Box py={10} minW={{base: 'md', md: 'xl', xl: "3xl"}} maxW={{base: 'md', md: 'xl', xl: "3xl"}}>
        <NameInput />
      </Box>
    </div>
  );
}

export default Customer;
