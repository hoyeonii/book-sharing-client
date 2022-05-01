import React from "react";
import { initReactI18next, useTranslation } from "react-i18next";

function Available({ available }) {
  const { t } = useTranslation();

  return (
    <div
      style={{
        paddingTop: "5px",
      }}
    >
      {
        <label
          className="available-label"
          style={{
            backgroundColor: `${available == 1 ? "#64cd69" : "#ffae00"}`,
          }}
        >
          {available}
          {available == 1 ? t("available") : t("notAvailable")}
        </label>
      }
    </div>
  );
}

export default Available;
