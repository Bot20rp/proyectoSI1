import React from "react";
import { products } from "../../utils/products";
import Select from "react-select";

const options = [
  { value: "Cervezas", label: "Cervezas" },
  { value: "Vinos", label: "Vinos" },
  { value: "Licores", label: "Licores" },
  { value: "Bebidas espirituosas", label: "Bebidas espirituosas" },
  { value: "Bebidas de aperitivo", label: "Bebidas de aperitivo" },
  { value: "Cócteles", label: "Cócteles" },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#0f3460",
    color: "white",
    borderRadius: "5px",
    border: "none",
    boxShadow: "none",
    width: "200px",
    height: "40px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#0f3460" : "white",
    color: state.isSelected ? "white" : "#0f3460",
    "&:hover": {
      backgroundColor: "#0f3460",
      color: "white",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
};

export const FilterSelect = ({ setFilterList }) => {
  const handleChange = (selectedOption) => {
    setFilterList(
      products.filter((item) => item.category === selectedOption.value)
    );
  };
  return (
    <Select
      options={options}
      defaultValue={{ value: "", label: "filtrar por categoriaa" }}
      styles={customStyles}
      onChange={handleChange}
    />
  );
};
