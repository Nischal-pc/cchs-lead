// import React from "react";
// import {
//   Stepper,
//   Step,
//   StepIndicator,
//   StepStatus,
//   StepIcon,
//   StepNumber,
//   StepTitle,
//   StepDescription,
//   StepSeparator,
//   Box,
// } from "@chakra-ui/react";
// import { useSteps } from "chakra-ui-steps";
// import { PageContext } from "../../context/context";
// import { useContext } from "react";

// const steps = [
//   { title: "First", description: "Lead Sources" },
//   { title: "Second", description: "Customer Info" },
//   { title: "Third", description: "Location" },
// ];

// export function StepperComponent() {
//   // Get the current page from PageContext
//   const { page } = useContext(PageContext);

//   // Adjust the page value to match the stepper's 0-based index
//   const activeStep = page - 1; // Subtract 1 to match step index

//   return (
//     <Stepper size="lg" index={activeStep}>
//       {steps.map((step, index) => (
//         <Step key={index}>
//           {/* Step Indicator with dynamic background color */}
//           <StepIndicator>
//             <Box
//               bg={activeStep === index ? "teal.400" : "gray.300"} // Highlight the active step's circle
//               color="white"
//               borderRadius="50%"
//               w="40px" // Width of the circle
//               h="40px" // Height of the circle
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//             >
//               {/* Show step number */}
//               {activeStep === index ? (
//                 <StepIcon /> // Active step icon (optional)
//               ) : (
//                 <StepNumber>{index + 1}</StepNumber> // Step number for inactive steps
//               )}
//             </Box>
//           </StepIndicator>

//           <Box flexShrink="0" p={4}>
//             <StepTitle>{step.title}</StepTitle>
//             <StepDescription>{step.description}</StepDescription>
//           </Box>

//           <StepSeparator />
//         </Step>
//       ))}
//     </Stepper>
//   );
// }
// import React from "react";
// import {
//   Stepper,
//   Step,
//   StepIndicator,
//   StepStatus,
//   StepNumber,
//   StepTitle,
//   StepDescription,
//   StepSeparator,
//   Box,
// } from "@chakra-ui/react";
// import { PageContext } from "../../context/context";
// import { useContext } from "react";

// const steps = [
//   { title: "First", description: "Lead Sources" },
//   { title: "Second", description: "Customer Info" },
//   { title: "Third", description: "Location" },
// ];

// export function StepperComponent() {
//   // Get the current page from PageContext
//   const { page } = useContext(PageContext);

//   // Adjust the page value to match the stepper's 0-based index
//   const activeStep = page - 1; // Subtract 1 to match step index

//   return (
//     <Stepper size="lg" index={activeStep}>
//       {steps.map((step, index) => (
//         <Step key={index}>
//           {/* Step Indicator with dynamic background color */}
//           <StepIndicator>
//             <Box
//               bg={activeStep === index ? "teal.400" : "gray.300"} // Highlight the active step's circle
//               color="white"
//               borderRadius="50%"
//               w="40px" // Width of the circle
//               h="40px" // Height of the circle
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//             >
//               {/* Show step number for all steps, even when active */}
//               <StepNumber>{index + 1}</StepNumber>{" "}
//               {/* This removes the StepIcon */}
//             </Box>
//           </StepIndicator>

//           <Box flexShrink="0" p={4}>
//             <StepTitle>{step.title}</StepTitle>
//             <StepDescription>{step.description}</StepDescription>
//           </Box>

//           <StepSeparator />
//         </Step>
//       ))}
//     </Stepper>
//   );
// }
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
} from "@chakra-ui/react";
import { PageContext } from "../../context/context";
import { useContext } from "react";

const steps = [
  { title: "First", description: "Lead Sources" },
  { title: "Second", description: "Customer Info" },
  { title: "Third", description: "Location" },
];

export function StepperComponent() {
  // Get the current page from PageContext
  const { page } = useContext(PageContext);

  // Adjust the page value to match the stepper's 0-based index
  const activeStep = page - 1; // Subtract 1 to match step index

  return (
    <Stepper size="lg" index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          {/* Step Indicator with dynamic background color */}
          <StepIndicator>
            <Box
              bg={
                index < activeStep // Completed steps
                  ? "green.400"
                  : activeStep === index // Current step
                  ? "teal.400"
                  : "gray.300" // Future steps
              }
              color="white"
              borderRadius="50%"
              w="40px" // Width of the circle
              h="40px" // Height of the circle
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {/* Show step number for all steps */}
              <StepNumber>{index + 1}</StepNumber>
            </Box>
          </StepIndicator>

          <Box flexShrink="0" p={4}>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
}
