import { BottomSheet } from "@/components/BottomSheets";
import { FilterTitle } from "./styles";
import {
  DateField,
  PaginatedAutocompleteField,
  SwitchField,
  TextField,
} from "@/components/FormFields";
import FilterButton from "@/components/Buttons/FilterButton";
import { fieldsRegex } from "@/config/regex";
import { useWatch } from "react-hook-form";
import { useCategory } from "@/services";
import { BooksFilterProps } from "./types";

export default function BooksFilter({
  handleOpenFilter,
  refFilter,
  filterFormControl,
  setValue,
  removePriceFilter
}: BooksFilterProps) {
  const { free } = useWatch({ control: filterFormControl });
  const { getCategories } = useCategory();
  return (
    <>
      <BottomSheet
        ref={refFilter}
        snapPoints={["75%"]}
        scrollViewProps={{
          contentContainerStyle: { padding: 16, gap: 20 },
        }}
      >
        <FilterTitle>Filtrar livros</FilterTitle>
        <DateField label="Data mínima da publicação" name="min_date" control={filterFormControl} />
        <DateField label="Data máxima da publicação" name="max_date" control={filterFormControl} />
        {!removePriceFilter && (
          <>
            <SwitchField
              label="Gratuíto"
              name="free"
              control={filterFormControl}
              customOnChange={() => {
                if(setValue){
                    setValue("min_price", null);
                    setValue("max_price", null);
                }
              }}
            />
            <TextField
              label="Preço mínimo"
              name="min_price"
              control={filterFormControl}
              mask={fieldsRegex.price}
              disabled={free}
              inputProps={{
                keyboardType: "numeric",
              }}
            />
            <TextField
              label="Preço máximo"
              name="max_price"
              control={filterFormControl}
              mask={fieldsRegex.price}
              disabled={free}
              inputProps={{
                keyboardType: "numeric",
              }}
            />
          </>
        )}
        <PaginatedAutocompleteField
          label="Categorias"
          name="categories"
          control={filterFormControl}
          multiple
          optionCompareKey="id"
          optionLabelKey="name"
          optionValueKey="id"
          filterKey="name"
          queryKey="categories"
          service={(params) => getCategories(params)}
        />
      </BottomSheet>
      <FilterButton onPress={handleOpenFilter} />
    </>
  );
}
