import { CheckIcon } from '@chakra-ui/icons';
import React from "react";
import {
  Stepper,
  Step,
  StepIndicator,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  Box,
  Text,
} from "@chakra-ui/react";
import { PageContext } from "../../context/context";
import { useContext } from "react";

const steps = [
  { title: "First", description: "Lead Sources" },
  { title: "Second", description: "Customer Info" },
  { title: "Third", description: "Location" },
];

export function StepperComponent() {
  const { page } = useContext(PageContext);
  const activeStep = page - 1;
  return (
    <Box minW={{base: 'md', md: 'xl', xl: "3xl"}} maxW={{base: 'md', md: 'xl', xl: "3xl"}}>
      <Stepper size="md" index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <Box
                bg={
                  index < activeStep
                    ? "green.400"
                    : activeStep === index
                    ? "teal.400"
                    : "gray.300"
                }
                color="white"
                borderRadius="50%"
                width={"100%"}
                height={"100%"}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <StepNumber>
                  {index < activeStep ? <CheckIcon w={4} h={4} color="white" /> : <Text>{index + 1}</Text>}
                </StepNumber>
              </Box>
            </StepIndicator>
            <Box flexShrink="0" py={4}>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
