import Location from "../Location/Location";
import NameInput from "./input";
import { Box } from "@chakra-ui/react";
function Customer(props) {
  return (
    <div>
      <Box py={10}>
        <NameInput />
      </Box>
    </div>
  );
}

export default Customer;
