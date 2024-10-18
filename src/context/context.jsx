import { createContext, useState } from "react";

export const PageContext = createContext();
const PageContextProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    lead: {
      source: "Hot Lead",
      types: [],
    },
    customer: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      home: "",
    },
    address: {
      fullAddress: "",
      street: "",
      city: "",
      province: "",
      country: "",
      postalCode: "",
    },
    meetingTime: "",
    notes: "",
  });
  return (
    <PageContext.Provider value={{ page, setPage, data, setData }}>
      {children}
    </PageContext.Provider>
  );
};
export default PageContextProvider;
