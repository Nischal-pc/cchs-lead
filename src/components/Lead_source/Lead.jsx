import { FormControl, FormLabel, Select, Button, Box } from "@chakra-ui/react";
import { PageContext } from "../../context/context";
import { useContext } from "react";

function Lead() {
  const { setPage, data, setData } = useContext(PageContext);

  return (
    <Box minW={{base: 'md', md: 'xl', xl: "3xl"}} maxW={{base: 'md', md: 'xl', xl: "3xl"}}>
      <FormControl py={4}>
        <FormLabel>Lead Sources</FormLabel>
        <Select 
          value={data.lead?.source}
          onChange={e => setData({...data, lead: {...data.lead, source: e.target.value}})}>
          <option>Hot Lead</option>
          <option>Zero Lead</option>
          <option>Bought Lead</option>
        </Select>
        <Button
          my={4}
          w="100%"
          colorScheme="blue"
          onClick={() => {
            setPage(2);
          }}
        >
          Next
        </Button>
      </FormControl>
    </Box>
  );
}

export default Lead;
