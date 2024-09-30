import Customer from "../Customer_information/Customer";
import React from "react";
import { Link } from "react-router-dom";
import { FormControl, FormLabel, Select, Button } from "@chakra-ui/react";
import Location from "../Location/Location";
import { PageContext } from "../../context/context";
import { useContext } from "react";

function Lead() {
  const { page, setPage } = useContext(PageContext);
  return (
    <div>
      <FormControl py={12}>
        <FormLabel>Lead Sources</FormLabel>
        <Select placeholder="Hot Lead">
          <option>Zero Lead</option>
          <option>Bought Lead</option>
        </Select>
        <Button
          w="100%"
          h="32px"
          mt="20px"
          colorScheme="blue"
          onClick={() => {
            setPage(2);
          }}
        >
          Next
        </Button>
        {/* <Link to="/customer"></Link> */}
      </FormControl>
      {/* <Customer />
      <Location /> */}
    </div>
  );
}

export default Lead;
