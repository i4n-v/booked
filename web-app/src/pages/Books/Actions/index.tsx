import { Tune } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { Actions } from "../styles";
import { BooksActionsProps, BooksFilters } from "./types";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../../components/Input";
import InputSelect from "../../../components/Input/Select";
import { useCallback, useEffect, useRef, useState } from "react";
import useCategory from "../../../services/useCategory";
import useDebounce from "../../../helpers/Debounce";
import Switch from "../../../components/Input/Switch";
import { SolicitationStatus } from "../../../commons/ISolicitation";

export default function BooksActions({
  filter,
  publish,
  solicitations,
  handleOpenPublish = (v: true) => null,
  handleFilter = (v: true) => null,
  dateLabels = {},
}: BooksActionsProps) {
  const [showFilters, setShowFilters] = useState<"true" | undefined>();
  const form = useForm<BooksFilters>({
    defaultValues: {
      categories: [],
      max_date: undefined,
      min_date: undefined,
      type: 'received'
    },
  });
  const debounceSearch = useDebounce(handleFilter, 700);
  const { getCategories } = useCategory();

  form.watch((formValues) => {
    debounceSearch({ ...formValues });
  });

  return (
    <Actions showfilters={showFilters}>
      <Box>
        {filter ? (
          <Button
            sx={{
              height: "42px",
              color: (t) => t.palette.secondary.main,
              display: "flex",
              font: (t) => t.font.xs,
              columnGap: "8px",
              padding: "1px",
            }}
            onClick={() =>
              setShowFilters((curr) => (!!curr ? undefined : "true"))
            }
          >
            <Tune color="primary" fontSize={"large"} />
            Filtros
          </Button>
        ) : null}
        {publish ? (
          <Button
            sx={{ height: "42px" }}
            onClick={() => handleOpenPublish(true)}
            variant="contained"
          >
            Publicar
          </Button>

        ) : null}
        {solicitations ? (
          <Box sx={{ display: "flex", columnGap: "20px" }}>
            <Button onClick={() => form.setValue("type", "received")} variant={form.watch('type') === "received" ? "contained" : "outlined"} sx={{ height: "44px" }}>SOLICITAÇÕES RECEBIDAS</Button>
            <Button onClick={() => form.setValue("type", "sended")} variant={form.watch('type') === "sended" ? "contained" : "outlined"}>SOLICITAÇÕES ENVIADAS</Button>
          </Box>
        ) : null}

      </Box>
      <FormProvider {...form}>
        <form>
          <Input
            type="date"
            name="min_date"
            label={dateLabels.minDate || "Data mínima da publicação"}
            shrink
          />
          <Input
            type="date"
            name="max_date"
            label={dateLabels.maxDate || "Data máxima da publicação"}
            shrink
          />

          {solicitations ?
            <InputSelect
              options={Object.entries(SolicitationStatus).map(i => ({ label: i[1], value: i[0] }))}
              name="status"
              optionLabel={"label"}
              label="Categorias"
              valueKey={"value"}
              multiple
            /> :
            <>
              <InputSelect
                service={getCategories}
                name="categories"
                optionLabel={"name"}
                label="Categorias"
                multiple
              />
              <Input name="min_price" label={"Preço minimo"} type="number" />
              <Input name="max_price" label={"Preço maximo"} type="number" />
              <Switch name="free" label={"Gratuito"} />

            </>

          }
        </form>
      </FormProvider>
    </Actions>
  );
}
