import React from "react";

export default function SearchForm({ handleSubmit, setFormValues }) {
  const handleChange = ({ target }) => {
    setFormValues(target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} placeholder="Search..." />
      <button type="submit">submit</button>
    </form>
  );
}
