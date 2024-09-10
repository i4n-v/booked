import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { SolicitationCard } from "@/components/Cards";
import { useSolicitation } from "@/services";
import { ListCounter } from "@/components";
import { FlatList } from "react-native-gesture-handler";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { useBottomSheet, useDebounce } from "@/hooks";
import { useMutation, useQuery } from "react-query";
import { format } from "date-fns";
import { BottomSheet } from "@/components/BottomSheets";
import { DateField, PaginatedAutocompleteField } from "@/components/FormFields";
import FilterButton from "@/components/Buttons/FilterButton";
import { ISolicitationStatus, SolicitationStatus } from "@/types/Solicitation";
import { Text } from "./styles";
import TabNavigation from "@/components/Navigation/TabNavigation";

const validations = z.object({
  min_date: z.date().nullable(),
  max_date: z.date().nullable(),
  status: z.array(z.string()),
});

type ISolicitationFilters = z.infer<typeof validations>;

export default function Solicitations() {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [solicitations, setSolicitations] = useState<any[]>([]);
  const [refFilter, handleOpenFilter, handleCloseFilter] = useBottomSheet();

  const filterForm = useForm<ISolicitationFilters>({
    defaultValues: {
      min_date: null,
      max_date: null,
      status: [],
    },
  });

  const filters = useWatch({ control: filterForm.control });

  const [selectedTab, setSelectedTab] = useState<string>("recebidas");

  const debouncedFilters = useDebounce({ ...filters, type: selectedTab });

  const handleSelectTab = (tab: string) => {
    setSelectedTab(tab);
    setPage(1);
  };

  useEffect(() => {
    setPage(1);
  }, [debouncedFilters]);

  const { getSolicitations, cancelSolicitation } = useSolicitation();

  const statusOptions = Object.keys(SolicitationStatus).map((key) => ({
    id: key,
    name: SolicitationStatus[key as keyof typeof SolicitationStatus],
  }));

  const wrappedStatusOptions = {
    totalPages: 1,
    totalItems: statusOptions.length,
    current: 1,
    limit: statusOptions.length,
    items: statusOptions,
  };

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
    ["solicitations", page, debouncedFilters],
    () => {
      let params = {
        page,
        limit: 10,
        min_date: debouncedFilters.min_date
          ? format(debouncedFilters.min_date, "yyyy-MM-dd")
          : null,
        max_date: debouncedFilters.max_date
          ? format(debouncedFilters.max_date, "yyyy-MM-dd")
          : null,
        status: debouncedFilters.status,
        type: debouncedFilters.type,
      };

      return getSolicitations(params);
    },
    {
      onSuccess(response) {
        if (page === 1) {
          setTotalPages(response.totalPages);
        }
        setSolicitations((solicitations) =>
          page === 1 ? response.items : [...solicitations, ...response.items],
        );
      },
    },
  );

  return (
    <>
      <BottomSheet
        ref={refFilter}
        snapPoints={["75%"]}
        scrollViewProps={{
          contentContainerStyle: { padding: 20, gap: 20 },
        }}
      >
        <DateField
          label="Data mínima da solicitação"
          name="min_date"
          control={filterForm.control}
        />
        <DateField
          label="Data máxima da solicitação"
          name="max_date"
          control={filterForm.control}
        />
        <PaginatedAutocompleteField
          label="Status da Solicitação"
          name="status"
          control={filterForm.control}
          multiple
          optionCompareKey="id"
          optionLabelKey="name"
          optionValueKey="id"
          filterKey="name"
          queryKey="status"
          service={() => Promise.resolve(wrappedStatusOptions)}
        />
      </BottomSheet>

      <FilterButton onPress={handleOpenFilter} />

      <TabNavigation
        selectedTab={selectedTab}
        onSelectTab={handleSelectTab}
        tabs={["recebidas", "enviadas"]}
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
          ListEmptyComponent={<Text>Nenhuma solicitação encontrada.</Text>}
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
