import React, { useState } from "react";
// import Layout from "../components/layouts";

export const multiStepContext = React.createContext();

const StepContext = ({ children }) => {
  const [currentStep, setStep] = useState(1);
  // const [userData, setUserData] = useState([]);
  const [projectName, setProjectName] = useState("");
  // const [finalData, setFinalData] = useState([]);

  // const submitData = () => {
  //   setFinalData([...finalData, userData]);
  //   setUserData("");
  //   setStep(1);
  // };

  
  return (
    <div>
      <multiStepContext.Provider
        value={{
          currentStep,
          setStep,
          // userData,
          // setUserData,
          // finalData,
          // setFinalData,
          // submitData,
          projectName,
          setProjectName,
        }}
      >
        {/* <Layout/> */}
        {children}
      </multiStepContext.Provider>
    </div>
  );
};

export default StepContext;
