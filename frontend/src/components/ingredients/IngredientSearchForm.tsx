import type { Dispatch, SetStateAction } from "react";

interface IngredientSearchFormProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

function IngredientSearchForm({
  searchTerm,
  setSearchTerm,
}: IngredientSearchFormProps) {
  return (
    <form
      className="ingredient-search-form"
      onSubmit={(event) => event.preventDefault()}
    >
      <label htmlFor="ingredient-search">
        Search recipes by ingredient
      </label>

      <input
        id="ingredient-search"
        type="text"
        placeholder="Example: Onion"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </form>
  );
}

export default IngredientSearchForm;