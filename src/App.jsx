import "./App.css";
import {
  ChakraProvider,
  FormControl,
  FormLabel,
  Select,
  Button,
  ButtonGroup,
  Box,
  Heading,
} from "@chakra-ui/react";
import Lead from "./components/Lead_source/Lead";
import Customer from "./components/Customer_information/Customer";
import Location from "./components/Location/Location";
import { StepperComponent } from "./components/Stepper/Stepper";
import { PageContext } from "./context/context";
import { useContext } from "react";

function App() {
  const { page, setPage } = useContext(PageContext);
  console.log(page);
  console.log(setPage);
  return (
    <>
      <ChakraProvider>
        <Box py={4} px={4}>
          <Heading color="teal.600" fontSize="48px">
            LEAD GENERATION FORM
          </Heading>
        </Box>

        <Box py={20}></Box>
        <StepperComponent />

        {page == 1 && <Lead />}
        {page == 2 && <Customer />}
        {page == 3 && <Location />}
      </ChakraProvider>
    </>
  );
}

export default App;
