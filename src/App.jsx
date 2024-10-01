import "./App.css";
import {
  ChakraProvider,
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
  const { page } = useContext(PageContext);

  return (
    <>
      <ChakraProvider>
        <Box py={'2em'} px={4} minW={{base: 'md', md: 'xl', xl: "3xl"}} maxW={{base: 'md', md: 'xl', xl: "3xl"}}>
          <Heading color="teal.600" fontSize="48px">
            LEAD GENERATION FORM
          </Heading>
        </Box>
        <StepperComponent />
        {page == 1 && <Lead />}
        {page == 2 && <Customer />}
        {page == 3 && <Location />}
      </ChakraProvider>
    </>
  );
}

export default App;
