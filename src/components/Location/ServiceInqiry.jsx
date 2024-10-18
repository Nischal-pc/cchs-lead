import { FormLabel, Textarea } from "@chakra-ui/react";
import { useContext } from "react";
import { PageContext } from "../../context/context";

const ServiceInquiry = () => {
  const { data, setData } = useContext(PageContext);

  const leadTypes = [
    "Tankless Water Heater",
    "HVAC",
    "Heat Pump",
    "Air Conditioner (A/C)",
    "Water Tank",
    "Attic Insulation",
    "Furnace",
    "Water Softener",
    "Hybrid Water Heater",
    "Bathroom Renovation",
    "Hybrid Heating System",
    "Kitchen Renovation",
    "Ducted Electric Heat Pump",
    "Home Renovation",
    "Rebate Consultation",
    "Existing Customer Visit",
  ];

  return (
    <form>
      <div>
        <FormLabel fontWeight="bold" fontSize="lg" py={2}>
          Service Inquiry
        </FormLabel>

        <div>
          <div spacing={4}>
            {leadTypes.map((lead, index) => (
              <input
                key={index}
                value={data.lead.types.includes(lead)}
                onChange={(e) => {
                  const { checked } = e.target;
                  setData({
                    ...data,
                    lead: {
                      ...data.lead,
                      types: checked
                        ? [...data.lead.types, lead]
                        : data.lead.types.filter((type) => type !== lead),
                    },
                  });
                }}
              >
                {lead}
              </input>
            ))}
          </div>
        </div>

        <div>
          <FormLabel htmlFor="notes" fontWeight="bold" fontSize="lg" py={2}>
            Notes
          </FormLabel>
          <Textarea
            id="notes"
            rows={4}
            placeholder="Enter any additional notes here..."
            borderColor="gray.300"
            _focus={{ borderColor: "green.500", boxShadow: "outline" }}
            _hover={{ borderColor: "gray.400" }}
            value={data.notes}
            onChange={(e) => setData({ ...data, notes: e.target.value })}
          />
        </div>
      </div>
    </form>
  );
};

export default ServiceInquiry;
