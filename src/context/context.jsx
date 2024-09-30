import { createContext } from "react";
import { useState } from "react";

export const PageContext = createContext();
const PageContextProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    lead: {},
    customer: {},
    location: {},
    meetingDetail: { dateTime: "" },
  });
  return (
    <PageContext.Provider value={{ page, setPage, data, setData }}>
      {children}
    </PageContext.Provider>
  );
};
export default PageContextProvider;
