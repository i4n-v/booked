import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { SolicitationCard } from "@/components/Cards";
import { useSolicitation } from "@/services";
import { ListCounter } from "@/components";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { useBottomSheet, useDebounce, useDebounceCallback } from "@/hooks";
import { useMutation, useQuery } from "react-query";
import { format } from "date-fns";
import { BottomSheet } from "@/components/BottomSheets";
import { DateField, PaginatedAutocompleteField } from "@/components/FormFields";
import FilterButton from "@/components/Buttons/FilterButton";
import {
  ISolicitationsFilters,
  ISolicitationStatus,
  ISolicitationsType,
  SolicitationStatus,
} from "@/types/Solicitation";
import { Text } from "./styles";
import TabNavigation from "@/components/Navigation/TabNavigation";
import { FlatList } from "@/components/Lists";
import AutoCompleteField from "@/components/FormFields/AutocompleteField";
import { BottomSheetHeader, BottomSheetTitle } from "../../(stack)/chat/styles";

const validations = z.object({
  min_date: z.date().nullable(),
  max_date: z.date().nullable(),
  status: z.array(z.string()),
});

type ISolicitationFilters = z.infer<typeof validations>;

export default function Solicitations() {
  const [totalPages, setTotalPages] = useState<number>(1);
  const [solicitations, setSolicitations] = useState<any[]>([]);
  const [refFilter, handleOpenFilter, handleCloseFilter] = useBottomSheet();
  const [filters, setFilters] = useState<ISolicitationsFilters>({
    type: "received",
    page: 1,
  });

  const { control,reset } = useForm<ISolicitationFilters>({
    defaultValues: {
      min_date: null,
      max_date: null,
      status: [],
    },
  });

  const formValues = useWatch({ control: control });
  const debouncedFilters = useDebounce(formValues);
  const { getSolicitations, cancelSolicitation } = useSolicitation();

  const cancelMutation = useMutation(cancelSolicitation, {
    onSuccess: (data) => {
      solicitationsQuery.refetch();
      console.log(data.message);
    },
    onError: (error: any) => {
      console.error(error.message);
    },
  });

  const updateStatus = (id: string, status: ISolicitationStatus) => {
    cancelMutation.mutate({ id, status });
  };
  const solicitationsQuery = useQuery(
    ["solicitations", filters,debouncedFilters],
    () => {
      let params = {
        page: filters.page,
        limit: 10,
        min_date: debouncedFilters.min_date
          ? format(debouncedFilters.min_date, "yyyy-MM-dd")
          : null,
        max_date: debouncedFilters.max_date
          ? format(debouncedFilters.max_date, "yyyy-MM-dd")
          : null,
        status: debouncedFilters.status,
        type: filters.type,
      };      
      return getSolicitations(params);
    },
    {
      onSuccess(response) {
        
        if (filters.page === 1) {
          setTotalPages(response.totalPages);
        }
        setSolicitations((solicitations) =>
          filters.page === 1 ? response.items : [...solicitations, ...response.items],
        );
      },
    },
  );

  const statusOptions = Object.keys(SolicitationStatus).map((key) => ({
    id: key,
    name: SolicitationStatus[key as keyof typeof SolicitationStatus],
  }));
  const handleSelectTab = (tab: string) => {
    const type: keyof typeof ISolicitationsType =
    tab === ISolicitationsType.received ? "received" : "sended";
    setFilters({ type, page: 1 });
    reset()
  };

  return (
    <>
      <BottomSheet
        ref={refFilter}
        snapPoints={["75%"]}
        scrollViewProps={{
          contentContainerStyle: { padding: 20, gap: 20 },
        }}
      >
        <BottomSheetHeader>
          <BottomSheetTitle>FILTRAR LIVROS</BottomSheetTitle>
        </BottomSheetHeader>
        <DateField label="Data mínima da solicitação" name="min_date" control={control} />
        <DateField label="Data máxima da solicitação" name="max_date" control={control} />
        <AutoCompleteField
          label="Status da Solicitação"
          name="status"
          control={control}
          multiple
          optionCompareKey="id"
          optionLabelKey="name"
          optionValueKey="id"
          options={statusOptions}
        />
      </BottomSheet>

      <FilterButton onPress={handleOpenFilter} />

      <TabNavigation
        selectedTab={filters.type}
        uppercase
        onSelectTab={(value) => handleSelectTab(value)}
        tabs={Object.values(ISolicitationsType)}
      />

      <ListCounter
        title="Solicitações"
        count={solicitations.length}
        total={solicitationsQuery.data?.totalItems ?? 0}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={solicitations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SolicitationCard
              id={item.id}
              status={item.status}
              book={item.book}
              user={item.user}
              updateStatus={updateStatus}
            />
          )}
          onEndReached={() => {
            const hasPagesToLoad = totalPages > filters.page;

            if (hasPagesToLoad && !solicitationsQuery.isFetching && !solicitationsQuery.error) {
              setFilters(({ page, ...curr }) => ({ ...curr, page: page + 1}));
            }
          }}
          emptyMessage={"Nenhuma solicitação encontrada."}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 96,
          }}
          ListFooterComponentStyle={{
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        />
      </SafeAreaView>
    </>
  );
}
